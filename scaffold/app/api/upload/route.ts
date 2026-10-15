import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://nphottnnloakekudwdeh.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_I0ygKNtmafX-5BM1DqklPQ_hpC5Ol1P";

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier n'a été fourni." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || "";
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueName = `${Date.now()}_${baseName}${ext}`;

    // 1. Essayer Supabase Storage en priorité (bucket 'portfolio')
    if (supabase) {
      try {
        const { data: storageData, error: storageError } = await supabase.storage
          .from("portfolio")
          .upload(uniqueName, buffer, {
            contentType: file.type || "application/octet-stream",
            upsert: true,
          });

        if (!storageError && storageData) {
          const { data: publicUrlData } = supabase.storage
            .from("portfolio")
            .getPublicUrl(uniqueName);

          if (publicUrlData?.publicUrl) {
            return NextResponse.json({
              success: true,
              url: publicUrlData.publicUrl,
              filename: uniqueName,
              type: file.type,
              size: file.size,
            });
          }
        }
      } catch (storageErr) {
        console.warn("[Upload] Supabase Storage non configuré ou indisponible:", storageErr);
      }
    }

    // 2. Essayer l'écriture sur le disque local (actif sur localhost / dev)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${uniqueName}`,
        filename: uniqueName,
        type: file.type,
        size: file.size,
      });
    } catch (fsErr: any) {
      // 3. Fallback immédiat pour Vercel (environnement serverless en lecture seule EROFS)
      console.warn("[Upload] Système de fichiers en lecture seule (Vercel EROFS), conversion en Data URL.");

      // Conversion en Base64 Data URL (images ou vidéos < 10Mo)
      if (
        file.type.startsWith("image/") ||
        file.type.startsWith("video/") ||
        file.type === "application/pdf" ||
        file.size < 10 * 1024 * 1024
      ) {
        const base64Data = buffer.toString("base64");
        const dataUrl = `data:${file.type || "application/octet-stream"};base64,${base64Data}`;

        return NextResponse.json({
          success: true,
          url: dataUrl,
          filename: uniqueName,
          type: file.type,
          size: file.size,
        });
      }

      throw fsErr;
    }
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return NextResponse.json(
      { error: err?.message || "Échec de l'enregistrement du fichier." },
      { status: 500 }
    );
  }
}
