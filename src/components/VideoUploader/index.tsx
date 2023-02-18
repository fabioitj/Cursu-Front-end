import "./styles.scss";
import { ChangeEvent, DragEvent, useState, useEffect } from "react";
import { enviarAulaVideo } from "../../hooks/aulasApi";
import ListarAulas from "../../models/Curso/Aula/ListarAulas";
import Curso from "../../models/Curso/Curso";

interface VideoUploaderProps {
    value: File;
    setValue: React.Dispatch<File>;
    aula: ListarAulas;
    setAula: React.Dispatch<ListarAulas>;
    setCurso?: React.Dispatch<Curso>;
    callback: (data?) => void;
};


function VideoUploader(VideoUploaderProps: VideoUploaderProps) {
    const {value, setValue, aula, setAula, setCurso, callback} = VideoUploaderProps;
    
    const upload = require("../../assets/images/white-upload.png")

    const getDurationVideo: (file: any) => Promise<string> = (file: any) => {
        return new Promise<string>((resolve, reject) => {
            const video = document.createElement("video");
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                resolve(video.duration.toString() as string);
            }

            video.onerror = () => {
                reject("Vídeo inválido");
            }

            video.src = window.URL.createObjectURL(file);
        })
        
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        // e.target.files && setValue(e.target.files[0] as File);
       

        const file = e.target.files ? e.target.files[0] as File : null;
        const duration = await getDurationVideo(file);
 
        const aulaUpdated = await enviarAulaVideo(file, aula, duration);
        console.log("updated: ", aulaUpdated);
        setAula(aulaUpdated as ListarAulas);
    }

    const handleDrag = (e: DragEvent<HTMLInputElement>) => {
        e.dataTransfer.files && setValue(e.dataTransfer.files[0] as File);
        
    }

    return (
        <div className="video-uploader">
            <input
                className="video-uploader-input"
                id={aula._id}
                type={"file"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                }}
                onDrop={(e: DragEvent<HTMLInputElement>) => {
                    handleDrag(e);
                }}
                accept=".mp4"
            />
            <label className="video-uploader-label" htmlFor={aula._id}>
                <img className="video-uploader-label-image" src={upload}/><strong>Envie a aula</strong>
            </label>
        </div>
    );
}

export default VideoUploader;