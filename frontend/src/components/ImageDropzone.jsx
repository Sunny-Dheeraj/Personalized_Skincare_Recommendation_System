import { ImagePlus, UploadCloud, X } from "lucide-react";
import { useMemo, useRef } from "react";

import GlassCard from "./GlassCard";


export default function ImageDropzone({ label, value, onFileSelect, onClear }) {
  const inputRef = useRef(null);
  const preview = useMemo(() => value?.preview || null, [value]);

  const handleFiles = (fileList) => {
    const file = fileList?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      return;
    }
    onFileSelect(file);
  };

  return (
    <GlassCard className="group relative overflow-hidden p-0">
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFiles(event.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="relative flex min-h-[250px] cursor-pointer flex-col justify-between p-5 transition duration-300 group-hover:bg-white/18 dark:group-hover:bg-white/7"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-slate dark:bg-white/8 dark:text-white">
            <ImagePlus className="h-4 w-4" />
            {label}
          </div>
          {value && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onClear();
              }}
              className="rounded-full bg-slate/10 p-2 text-slate transition hover:bg-slate/15 dark:bg-white/8 dark:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {preview ? (
          <div className="mt-4 overflow-hidden rounded-[22px] border border-white/45">
            <img src={preview} alt={label} className="h-44 w-full object-cover" />
          </div>
        ) : (
          <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-[22px] border border-dashed border-slate/15 bg-white/45 px-6 py-10 text-center dark:border-white/10 dark:bg-white/5">
            <div className="mb-4 rounded-full bg-aqua/15 p-4 text-aqua">
              <UploadCloud className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-slate dark:text-white">Drop image here</p>
            <p className="mt-2 text-xs text-slate/60 dark:text-white/55">or click to browse from your device</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
