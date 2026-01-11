import { useEffect, useState } from "react";
import supabase from "../supabase-client";

export default function Avatar({ url, size = 96, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!url) {
      setAvatarUrl(null);
      return;
    }

    let objectUrl = null;

    const downloadImage = async () => {
      const { data, error } = await supabase.storage.from("avatars").download(url);
      if (error) return;

      objectUrl = URL.createObjectURL(data);
      setAvatarUrl(objectUrl);
    };

    downloadImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url]);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      onUpload(filePath);
    } catch (e) {
      alert(e?.message ?? "Upload error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        style={{ width: size, height: size }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-white/50">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-xl bg-white/10 px-3 py-2 text-sm text-white/90 ring-1 ring-white/10 transition hover:bg-white/15">
          {uploading ? "Uploading..." : "Carica avatar"}
          <input
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
            className="hidden"
          />
        </label>

        <p className="text-xs text-white/50">
          (PNG/JPG, consigliato quadrato)
        </p>
      </div>
    </div>
  );
}