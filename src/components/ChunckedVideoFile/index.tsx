import "./style.scss";
import { useEffect, ChangeEvent, DragEvent, useState } from "react";
import { updateAulaUrl, uploadVideoAula } from "../../hooks/aulasApi";
import { error, notify } from "../../assets/scripts/modal";
import { useModalContext } from "../../context/ModalContext";
import UpdateAulaUrl from "../../models/Curso/Aula/UpdateAulaUrl";

interface VideoFileProps {
    value: File[];
    setValue: React.Dispatch<any>;
    placeholder?: string;
    id?: string;
    callback?: (data?) => void;
}

function ChunckedVideoFile(VideoFileProps: VideoFileProps) {
    const chunkSize = 1024 * 1024;

    
    const { setTitle, setMessage, setType, setOpenedModal } = useModalContext();
    const { value, setValue, placeholder, id, callback } = VideoFileProps;
    const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(
        null
    );
    const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState<
        number | null
    >(null);
    const [currentChunkIndex, setCurrentChunkIndex] = useState<number | null>(
        null
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.target.files);
    };

    const handleDrag = (e: DragEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.dataTransfer.files);
    };

    const readAndUploadCurrentChunk = () => {
        const reader = new FileReader();
        const file = value[currentFileIndex as number];
        if (!file) {
            return;
        }

        const from = (currentChunkIndex as number) * chunkSize;
        const to = from + chunkSize;
        const blob = file.slice(from, to);
        reader.onload = (e) => uploadChunk(e);
        reader.readAsDataURL(blob);
    };

    const uploadChunk = (readerEvent) => {
        const file = value[currentFileIndex as number];
        const data = readerEvent.target.result;
        const params = new URLSearchParams();
        params.set("name", file.name);
        params.set(
            "currentChunkIndex",
            currentChunkIndex ? currentChunkIndex.toString() : ""
        );
        params.set("totalChunks", Math.ceil(file.size / chunkSize).toString());

        // uploadVideoAula(id as string, data, params)
        //     .then((response) => {
        //         if (response && response.data) {
        //             const file = value[currentFileIndex as number];
        //             const fileSize = file.size;
        //             const isLastChunk =
        //                 currentChunkIndex ===
        //                 Math.ceil(fileSize / chunkSize) - 1;
        //             if (isLastChunk) {
        //                 // file.finalFilename = response.data.finalFilename;
        //                 setLastUploadedFileIndex(currentFileIndex);
        //                 setCurrentChunkIndex(null);

        //                 callback && callback(response.data);
        //             } else {
        //                 setCurrentChunkIndex((currentChunkIndex as number) + 1);
        //             }
        //         }
        //     })
        //     .catch((err) => {
        //         error(
        //             err.message,
        //             setTitle,
        //             setMessage,
        //             setType,
        //             setOpenedModal
        //         );
        //     });
    };

    useEffect(() => {
        if (lastUploadedFileIndex === null) {
            return;
        }

        const isLastFile = lastUploadedFileIndex === value.length - 1;
        const nextFileIndex = isLastFile
            ? null
            : (currentFileIndex as number) + 1;
        setCurrentFileIndex(nextFileIndex);
    }, [lastUploadedFileIndex]);

    useEffect(() => {
        if (value?.length > 0) {
            if (currentFileIndex === null) {
                setCurrentFileIndex(
                    lastUploadedFileIndex === null
                        ? 0
                        : lastUploadedFileIndex + 1
                );
            }
        }
    }, [value?.length]);

    useEffect(() => {
        if (currentFileIndex !== null) {
            setCurrentChunkIndex(0);
        }
    }, [currentFileIndex]);

    useEffect(() => {
        if (currentChunkIndex !== null) readAndUploadCurrentChunk();
    }, [currentChunkIndex]);

    return (
        <div className="video-file">
            <input
                className={"video-file-input"}
                id={id}
                placeholder={placeholder}
                type={"file"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                }}
                onDrop={(e: DragEvent<HTMLInputElement>) => {
                    handleDrag(e);
                }}
                accept=".mp4"
            />
            <label className={"video-file-label"} htmlFor={id}>
                <strong>{placeholder}</strong>
            </label>
        </div>
    );
}

export default ChunckedVideoFile;
