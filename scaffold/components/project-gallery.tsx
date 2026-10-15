"use client";

import { useState } from "react";
import { Play, Sparkles, Images, Check } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  videoSource?: string | null;
  title: string;
  slug: string;
}

export function ProjectGallery({
  images,
  videoSource,
  title,
  slug,
}: ProjectGalleryProps) {
  // If videoSource exists, default to video; otherwise default to the first image (index 0 = cover image)
  const [activeMedia, setActiveMedia] = useState<"video" | number>(
    videoSource ? "video" : 0
  );

  const hasMultipleImages = images.length > 1;
  const currentImage = typeof activeMedia === "number" ? images[activeMedia] : images[0];

  return (
    <div className="project-gallery-container">
      {/* Main Showcase Mockup Window */}
      <div className="project-showcase-window">
        <div className="window-header-bar">
          <div className="window-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="window-url-badge">
            <span>🔒 https://emnaghorbel.dev/projects/{slug}</span>
          </div>
          <div style={{ width: 60, display: "flex", justifyContent: "flex-end" }}>
            {images.length > 0 && (
              <span style={{ fontSize: "11px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                <Images size={12} /> {images.length}
              </span>
            )}
          </div>
        </div>

        <div className="window-content-viewport">
          {activeMedia === "video" && videoSource ? (
            <div className="video-player-wrapper">
              <div className="video-player-badge">
                <Play size={13} fill="#fff" />
                <span>Démonstration Vidéo Interactive</span>
              </div>
              <video
                src={videoSource}
                controls
                playsInline
                preload="metadata"
                className="featured-video-player"
              />
            </div>
          ) : currentImage ? (
            <img
              src={currentImage}
              alt={`${title} - Aperçu`}
              className="featured-showcase-img"
            />
          ) : (
            <div style={{ padding: "4rem", color: "#64748b", textAlign: "center" }}>
              Aucun média visuel disponible
            </div>
          )}
        </div>
      </div>

      {/* Multi-Image Gallery Switcher Thumbnails */}
      {(hasMultipleImages || (videoSource && images.length > 0)) && (
        <div className="gallery-thumbnails-strip">
          <div className="gallery-strip-header">
            <span className="gallery-strip-title">
              <Images size={15} />
              <span>Galerie du projet ({images.length} photo{images.length > 1 ? "s" : ""})</span>
            </span>
            <span className="gallery-strip-hint">Cliquez sur une image pour l'afficher en grand</span>
          </div>

          <div className="thumbnails-scroll-row">
            {/* If video exists, show video thumbnail button */}
            {videoSource && (
              <button
                type="button"
                className={`thumb-btn ${activeMedia === "video" ? "active" : ""}`}
                onClick={() => setActiveMedia("video")}
                title="Afficher la vidéo démo"
              >
                <div className="thumb-video-overlay">
                  <Play size={18} fill="#fff" />
                </div>
                <div className="thumb-caption">Vidéo Démo</div>
              </button>
            )}

            {/* List of all images */}
            {images.map((imgUrl, idx) => {
              const isSelected = activeMedia === idx || (activeMedia !== "video" && idx === activeMedia);
              const isCover = idx === 0;

              return (
                <button
                  key={idx}
                  type="button"
                  className={`thumb-btn ${isSelected ? "active" : ""}`}
                  onClick={() => setActiveMedia(idx)}
                  title={isCover ? "Image de couverture (Principale)" : `Photo ${idx + 1}`}
                >
                  <img src={imgUrl} alt={`Miniature ${idx + 1}`} className="thumb-img" />
                  {isCover && (
                    <span className="thumb-cover-tag" title="Image principale sur l'interface">
                      ★ Couverture
                    </span>
                  )}
                  {isSelected && (
                    <span className="thumb-check-tag">
                      <Check size={11} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
