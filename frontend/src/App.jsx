import Recorder from "./Components/Recorder"

function App() {
  function handleAudioBlob(blob) {
    console.log("Received audio blob:", blob);
  }

  return (
    <div>
      <h1>English Trainer</h1>
      <Recorder onResult={handleAudioBlob} />
    </div>
  )
}

export default App
