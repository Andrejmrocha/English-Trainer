import { useState, useRef } from "react";

function Recorder({ onResult }) {
    const [ isRecording, setIsRecording ] = useState(false);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
            chunksRef.current.push(e.data);
        }

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
            onResult(blob);
            stream.getTracks().forEach(t => t.stop());
        }

        mediaRecorder.start();
        setIsRecording(true);
    }

    function stopRecording() {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    }

    function handleClick() {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }

    return (
        <div>
            <button onClick={handleClick}>
                {isRecording ? 'Stop' : 'Record'}
            </button>
            <p>{isRecording ? 'Recording...' : 'Click to record'}</p>
        </div>
    )

}

export default Recorder;