import { CameraIcon } from "@/src/shared/constants/icons/camera-icon";

export function ImageBox({
                           url,
                           onClick,
                         }: {
  url?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 88,
        height: 110,
        border: "1px dashed #ccc",
        borderRadius: 10,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {url ? (
        <img
          src={url}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <CameraIcon size="md" />
      )}
    </div>
  );
}
