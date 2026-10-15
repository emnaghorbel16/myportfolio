"use client";

import { useEffect, useState, useRef } from "react";
import { supabase, type Row } from "@/lib/data";
import {
  Plus,
  Trash2,
  Save,
  Eye,
  EyeOff,
  LoaderCircle,
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  X,
  ExternalLink,
  Check,
  Images
} from "lucide-react";

// ---------------------------------------------------------------------------
// Shared upload helper: uploads directly from browser → Supabase Storage
// Bypasses Next.js API route body-size limits (Vercel hard-caps at ~4.5 MB)
// ---------------------------------------------------------------------------
async function uploadFileToSupabase(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const uniqueName = `${Date.now()}_${safeName}`;

  // 1. Try Supabase Storage (direct browser → bucket, no size limit beyond bucket policy)
  if (supabase) {
    const { data, error } = await supabase.storage
      .from("portfolio")
      .upload(uniqueName, file, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (!error && data) {
      const { data: pub } = supabase.storage
        .from("portfolio")
        .getPublicUrl(uniqueName);
      if (pub?.publicUrl) return pub.publicUrl;
    }
    // Log but continue to fallback
    console.warn("[upload] Supabase Storage failed:", error?.message);
  }

  // 2. Fallback: route API (works on localhost / small files <4.5 MB on Vercel)
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const text = await res.text();
  let json: any;
  try { json = JSON.parse(text); } catch {
    throw new Error(
      res.status === 413
        ? `Fichier trop volumineux (${(file.size / 1024 / 1024).toFixed(1)} MB). Activez le bucket Supabase "portfolio" pour les gros fichiers.`
        : `Erreur serveur (${res.status})`
    );
  }
  if (!res.ok) throw new Error(json.error || "Erreur de téléversement");
  return json.url;
}

interface ProjectImagesUploaderProps {
  name: string;
  value: string;
  onChange: (val: string) => void;
}

function ProjectImagesUploader({ name, value, onChange }: ProjectImagesUploaderProps) {
  const images = value
    ? value
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateImages = (newImages: string[]) => {
    onChange(newImages.join(", "));
  };

  const setAsCover = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const rest = images.filter((_, i) => i !== index);
    updateImages([selected, ...rest]);
  };

  const removeImage = (index: number) => {
    updateImages(images.filter((_, i) => i !== index));
  };

  const addUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!images.includes(trimmed)) {
      updateImages([...images, trimmed]);
    }
    setUrlInput("");
  };

  const handleMultipleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      const newUrls: string[] = [];
      for (const file of files) {
        const url = await uploadFileToSupabase(file);
        newUrls.push(url);
      }
      updateImages([...images, ...newUrls]);
    } catch (err: any) {
      setError(err?.message || "Impossible de téléverser les images.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="project-images-manager">
      <input type="hidden" name={name} value={value} />

      {/* Toolbar / Upload Actions */}
      <div className="pim-toolbar">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleMultipleFiles}
          style={{ display: "none" }}
        />

        <button
          type="button"
          className="pim-upload-btn"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <>
              <LoaderCircle size={15} className="spin" />
              <span>Téléversement de vos photos...</span>
            </>
          ) : (
            <>
              <Upload size={15} />
              <span>📁 Ajouter des photos depuis votre PC (Sélection multiple)</span>
            </>
          )}
        </button>

        <div className="pim-url-row">
          <input
            type="text"
            placeholder="Ou coller une URL d'image (https://...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUrl();
              }
            }}
          />
          <button type="button" onClick={addUrl} className="pim-add-url-btn">
            + Ajouter
          </button>
        </div>
      </div>

      {error && <div className="pim-error-msg">{error}</div>}

      {/* Images List & Selection */}
      <div className="pim-gallery-section">
        <div className="pim-section-header">
          <span className="pim-count-badge">
            <Images size={13} /> {images.length} photo{images.length > 1 ? "s" : ""} dans ce projet
          </span>
          <span className="pim-instructions">
            ⭐ L'image avec le badge <strong>« Couverture principale »</strong> est celle qui apparaît sur l'interface et les cartes.
          </span>
        </div>

        {images.length === 0 ? (
          <div className="pim-empty-box" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon size={32} />
            <p>Aucune photo sélectionnée pour ce projet.</p>
            <small>Cliquez pour choisir une ou plusieurs photos depuis votre ordinateur.</small>
          </div>
        ) : (
          <div className="pim-cards-grid">
            {images.map((imgUrl, idx) => {
              const isCover = idx === 0;

              return (
                <div
                  key={idx}
                  className={`pim-card ${isCover ? "is-cover" : ""}`}
                >
                  <div className="pim-img-frame">
                    <img src={imgUrl} alt={`Photo ${idx + 1}`} />
                    {isCover && (
                      <span className="pim-cover-badge">
                        ★ Couverture (Interface)
                      </span>
                    )}
                  </div>

                  <div className="pim-card-actions">
                    {isCover ? (
                      <span className="pim-selected-indicator">
                        <Check size={12} /> Affichée en couverture
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="pim-choose-cover-btn"
                        onClick={() => setAsCover(idx)}
                        title="Sélectionner cette photo pour l'afficher sur l'interface principale"
                      >
                        ⭐ Choisir pour l'interface
                      </button>
                    )}

                    <button
                      type="button"
                      className="pim-delete-btn"
                      onClick={() => removeImage(idx)}
                      title="Supprimer cette photo du projet"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


interface MediaUploaderProps {
  name: string;
  value: string;
  onChange: (val: string) => void;
  accept?: string;
  typeLabel?: "photo" | "video" | "document" | "media";
}

function MediaUploader({ name, value, onChange, accept = "image/*", typeLabel = "photo" }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVideo = value && (value.match(/\.(mp4|webm|ogg|mov)$/i) || value.includes("/uploads/") && value.includes("video"));
  const isPdf = value && value.toLowerCase().endsWith(".pdf");
  const isImage = value && !isVideo && !isPdf;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const url = await uploadFileToSupabase(file);
      onChange(url);
    } catch (err: any) {
      setError(err?.message || "Impossible de téléverser le fichier.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }


  return (
    <div className="media-field-container">
      <div className="media-field-row">
        <input
          name={name}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            typeLabel === "video" 
              ? "/uploads/... ou lien démo vidéo / externe" 
              : typeLabel === "document" 
              ? "/uploads/... ou lien PDF"
              : "https://... ou fichier local"
          }
          style={{ flex: 1 }}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFile}
          style={{ display: "none" }}
        />
        <button
          type="button"
          className="media-upload-btn"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          title={`Choisir un fichier ${typeLabel} depuis votre PC`}
        >
          {uploading ? (
            <>
              <LoaderCircle size={13} className="spin" />
              <span>Envoi...</span>
            </>
          ) : typeLabel === "video" ? (
            <>
              <Video size={13} />
              <span>🎬 Choisir vidéo (PC)</span>
            </>
          ) : typeLabel === "document" ? (
            <>
              <FileText size={13} />
              <span>📄 Choisir PDF (PC)</span>
            </>
          ) : (
            <>
              <Upload size={13} />
              <span>📁 Choisir photo (PC)</span>
            </>
          )}
        </button>
      </div>

      {error && <span style={{ color: "#a45b4a", fontSize: "10px" }}>{error}</span>}

      {value && (
        <div className="media-preview-box">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "10px", color: "#657165" }}>Aperçu :</span>
            <button
              type="button"
              onClick={() => onChange("")}
              style={{ background: "none", border: 0, color: "#a45b4a", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}
            >
              <X size={12} /> Supprimer
            </button>
          </div>

          {isVideo ? (
            <video
              src={value}
              controls
              playsInline
              style={{ maxHeight: "200px", width: "100%", borderRadius: "4px", background: "#000" }}
            />
          ) : isPdf ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", padding: "6px 8px", background: "#eef2ea", borderRadius: "3px" }}>
              <FileText size={16} color="#203e34" />
              <span>Document PDF chargé</span>
              <a href={value} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "3px" }}>
                Ouvrir <ExternalLink size={12} />
              </a>
            </div>
          ) : isImage ? (
            <img
              src={value}
              alt="Aperçu"
              style={{ maxHeight: "160px", maxWidth: "100%", objectFit: "contain", borderRadius: "4px", background: "#fff", border: "1px solid #e0e3db" }}
              onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

const config: Record<string, { table: string; label: string; columns: string[]; hidden?: string[] }> = {
  profile: {
    table: "profiles",
    label: "Profile",
    columns: ["name", "professional_title", "short_bio", "about", "location", "email", "phone", "profile_image_url", "cv_url"],
  },
  projects: {
    table: "projects",
    label: "Projects",
    columns: ["title", "slug", "short_description", "description", "category_id", "image_url", "demo_url", "github_url", "featured", "published", "display_order"],
  },
  categories: {
    table: "categories",
    label: "Categories",
    columns: ["name", "slug", "description", "icon", "display_order", "is_visible"],
  },
  technologies: {
    table: "technologies",
    label: "Technologies",
    columns: ["name", "icon"],
  },
  skills: {
    table: "skills",
    label: "Skills",
    columns: ["name", "category", "level", "icon_url", "display_order", "is_visible"],
  },
  experience: {
    table: "experience",
    label: "Experience",
    columns: ["company", "position", "location", "description", "start_date", "end_date", "current", "technologies", "display_order", "is_visible"],
  },
  education: {
    table: "education",
    label: "Education",
    columns: ["institution", "degree", "field", "description", "location", "start_date", "end_date", "current", "display_order", "is_visible"],
  },
  achievements: {
    table: "achievements",
    label: "Achievements",
    columns: ["title", "description", "date", "organization", "image_url", "display_order", "is_visible"],
  },
  "social-links": {
    table: "social_links",
    label: "Social Links",
    columns: ["platform", "url", "icon", "display_order", "is_visible"],
  },
  messages: {
    table: "contact_messages",
    label: "Messages",
    columns: ["name", "email", "subject", "message", "is_read"],
    hidden: ["name", "email", "subject", "message"],
  },
  settings: {
    table: "site_settings",
    label: "Settings",
    columns: ["site_name", "site_description", "logo_url", "favicon_url", "seo_title", "seo_description", "seo_keywords", "primary_color", "secondary_color"],
  },
};

export function AdminManager({ section }: { section: string }) {
  const cfg = config[section] ?? config.categories;
  const [items, setItems] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const tablesWithDisplayOrder = [
    "projects",
    "categories",
    "skills",
    "experience",
    "education",
    "achievements",
    "social_links",
  ];

  async function load() {
    if (!supabase) return;
    const hasOrder = tablesWithDisplayOrder.includes(cfg.table);
    const query = supabase.from(cfg.table).select("*");
    const { data, error } = hasOrder
      ? await query.order("display_order", { ascending: true })
      : await query.order("created_at", { ascending: false });
    if (!error) setItems(data as Row[]);
    else setNotice(error.message);
  }

  useEffect(() => {
    void load();
  }, [cfg.table]);

  function blank() {
    return Object.fromEntries(
      cfg.columns.map((k) => [
        k,
        k === "display_order"
          ? items.length
          : k === "is_visible"
          ? true
          : k === "published"
          ? false
          : k === "featured" || k === "current" || k === "is_read"
          ? false
          : "",
      ])
    );
  }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase || !editing) return;
    setBusy(true);
    setNotice("");

    const form = new FormData(e.currentTarget);
    const body: Row = {};

    cfg.columns.forEach((k) => {
      // Priorité à l'état local editing pour les champs média téléversés
      const v = editing[k] !== undefined ? editing[k] : form.get(k);
      if (typeof v === "string" || typeof v === "number") {
        body[k] = ["display_order", "level"].includes(k)
          ? v ? Number(v) : null
          : v;
      }
    });

    for (const k of ["is_visible", "published", "featured", "current", "is_read"]) {
      if (cfg.columns.includes(k)) body[k] = form.get(k) === "on";
    }

    if (section === "profile" && !editing.id && items[0]) {
      body.id = items[0].id;
    }

    const result = editing.id
      ? await supabase.from(cfg.table).update(body).eq("id", editing.id)
      : await supabase.from(cfg.table).insert(body);

    if (result.error) setNotice(result.error.message);
    else {
      setNotice("Enregistré avec succès !");
      setEditing(null);
      await load();
      void fetch("/api/revalidate", { method: "POST" }).catch(() => {});
    }
    setBusy(false);
  }

  async function remove(id: string) {
    if (!supabase || !window.confirm("Supprimer cet élément définitivement ?")) return;
    setBusy(true);

    try {
      // Si c'est un projet, supprimer d'abord les liaisons project_technologies pour éviter les erreurs de contrainte de clé étrangère
      if (cfg.table === "projects") {
        await supabase.from("project_technologies").delete().eq("project_id", id);
      }

      const { error } = await supabase.from(cfg.table).delete().eq("id", id);
      if (error) {
        setNotice(`Erreur de suppression : ${error.message}`);
      } else {
        setNotice("Élément supprimé avec succès !");
        await load();
        void fetch("/api/revalidate", { method: "POST" }).catch(() => {});
      }
    } catch (err: any) {
      setNotice(`Erreur : ${err?.message || "Suppression impossible"}`);
    } finally {
      setBusy(false);
    }
  }

  if (!supabase) return <p className="admin-note">Variables d'environnement Supabase requises.</p>;

  return (
    <div className="manager">
      <div className="manager-heading">
        <div>
          <span className="section-kicker">GESTION DU PORTFOLIO</span>
          <h1>{cfg.label}</h1>
          <p>Créez, modifiez, téléversez vos médias et organisez vos {cfg.label.toLowerCase()}.</p>
        </div>
        {!["messages", "settings"].includes(section) && (
          <button className="admin-primary" onClick={() => setEditing(blank())}>
            <Plus size={16} /> Ajouter {section === "profile" ? "des détails" : cfg.label.replace(/s$/, "")}
          </button>
        )}
      </div>

      {notice && <div className="admin-notice">{notice}</div>}

      {editing && (
        <form className="record-form" onSubmit={save}>
          <div className="record-form-title">
            <h2>{editing.id ? "Modifier" : "Ajouter"} {cfg.label.replace(/s$/, "")}</h2>
            <button type="button" onClick={() => setEditing(null)}>Annuler</button>
          </div>

          <div className="field-grid">
            {cfg.columns.map((k) => {
              const isProjectImages = k === "image_url" && section === "projects";
              const isMedia = ["image_url", "profile_image_url", "icon_url", "logo_url", "favicon_url"].includes(k);
              const isVideoDemo = k === "demo_url" && section === "projects";
              const isDoc = k === "cv_url";
              const isWide = isProjectImages || isMedia || isVideoDemo || isDoc || ["description", "about", "short_bio", "message", "seo_description"].includes(k);

              return (
                <label key={k} className={isWide ? "wide" : ""}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{k.replaceAll("_", " ")}</span>
                    {isProjectImages && <small style={{ color: "#2563eb", fontWeight: 600 }}>Plusieurs photos & sélection de la couverture</small>}
                    {isVideoDemo && <small style={{ color: "#2563eb", fontWeight: 600 }}>Vidéo démo ou lien web</small>}
                  </div>

                  {["is_visible", "published", "featured", "current", "is_read"].includes(k) ? (
                    <input name={k} type="checkbox" defaultChecked={Boolean(editing[k])} />
                  ) : isProjectImages ? (
                    <ProjectImagesUploader
                      name={k}
                      value={editing[k] ?? ""}
                      onChange={(newVal) => setEditing({ ...editing, [k]: newVal })}
                    />
                  ) : isMedia ? (
                    <MediaUploader
                      name={k}
                      value={editing[k] ?? ""}
                      onChange={(newVal) => setEditing({ ...editing, [k]: newVal })}
                      accept="image/*"
                      typeLabel="photo"
                    />
                  ) : isVideoDemo ? (
                    <MediaUploader
                      name={k}
                      value={editing[k] ?? ""}
                      onChange={(newVal) => setEditing({ ...editing, [k]: newVal })}
                      accept="video/*,image/*"
                      typeLabel="video"
                    />
                  ) : isDoc ? (
                    <MediaUploader
                      name={k}
                      value={editing[k] ?? ""}
                      onChange={(newVal) => setEditing({ ...editing, [k]: newVal })}
                      accept=".pdf,application/pdf"
                      typeLabel="document"
                    />
                  ) : ["description", "about", "short_bio", "message", "seo_description"].includes(k) ? (
                    <textarea 
                      name={k} 
                      value={editing[k] ?? ""} 
                      onChange={(e) => setEditing({ ...editing, [k]: e.target.value })} 
                      rows={4} 
                    />
                  ) : (
                    <input
                      name={k}
                      value={editing[k] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [k]: e.target.value })}
                      type={["display_order", "level"].includes(k) ? "number" : k.endsWith("_date") || k === "date" ? "date" : "text"}
                      required={["title", "name", "slug", "position", "company", "degree", "institution", "platform", "url", "site_name"].includes(k)}
                    />
                  )}
                </label>
              );
            })}
          </div>

          <button className="admin-primary" disabled={busy}>
            {busy ? <LoaderCircle className="spin" size={16} /> : <Save size={16} />}
            Enregistrer
          </button>
        </form>
      )}

      <div className="record-list">
        {items.map((item) => (
          <article className="record-row" key={item.id}>
            <div>
              <strong>
                {item.title || item.name || item.company || item.position || item.institution || item.platform || item.site_name || item.subject || "Enregistrement"}
              </strong>
              <small>
                {item.short_description || item.email || item.slug || item.category || item.created_at?.slice(0, 10) || cfg.label}
              </small>
            </div>
            <div className="record-status">
              {item.published === false ? (
                <span className="status off"><EyeOff size={13} /> Brouillon</span>
              ) : item.published === true ? (
                <span className="status"><Eye size={13} /> Publié</span>
              ) : item.is_read === false && section === "messages" ? (
                <span className="status off">Non lu</span>
              ) : null}
              {item.featured && <span className="status">Mis en avant</span>}
            </div>
            <div className="record-actions">
              <button onClick={() => setEditing(item)} aria-label="Modifier">Modifier</button>
              {section === "messages" && !item.is_read && (
                <button
                  onClick={async () => {
                    await supabase!.from(cfg.table).update({ is_read: true }).eq("id", item.id);
                    await load();
                  }}
                >
                  Marquer lu
                </button>
              )}
              <button onClick={() => remove(item.id)} aria-label="Supprimer">
                <Trash2 size={15} />
              </button>
            </div>
          </article>
        ))}
        {items.length === 0 && !editing && (
          <div className="admin-empty">Aucun enregistrement pour le moment. Cliquez sur Ajouter ci-dessus.</div>
        )}
      </div>
    </div>
  );
}
