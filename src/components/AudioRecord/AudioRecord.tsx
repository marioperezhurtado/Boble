import { useEffect, useRef } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import useOnClickOutside from '../../hooks/useOnClickOutside'

import StartRecordIcon from '../../assets/StartRecordingIcon'
import StopRecordIcon from '../../assets/StopRecordIcon'
import PlayIcon from '../../assets/PlayIcon'
import PauseIcon from '../../assets/PauseIcon'
import SendAudioIcon from '../../assets/SendAudioIcon'

const MAX_RECORDING_TIME = 90

interface Props {
  onClose: () => void
  onSend: (audio: File) => void
}

export default function AudioRecord({ onClose, onSend }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    isPaused,
    isRecording,
    recordingTime,
    recordingBlob
  } = useAudioRecorder()

  useOnClickOutside({
    ref,
    handler: () => {
      stopRecording()
      onClose()
    }
  })

  useEffect(() => {
    startRecording()
  }, [])

  useEffect(() => {
    if (recordingTime === MAX_RECORDING_TIME) {
      togglePauseResume()
    }
    if (recordingTime > MAX_RECORDING_TIME) {
      stopRecording()
    }
  }, [recordingTime])

  const handleToggleStartStop = () =>
    isRecording ? stopRecording() : startRecording()

  const handleTogglePauseResume = () => {
    if (!isRecording) return
    togglePauseResume()
  }

  const handleSend = () => {
    console.log(recordingBlob)

    if (recordingTime < 1 || !recordingBlob) return

    console.log('sending...')

    const file = new File([recordingBlob], 'audio.webm', {
      type: 'audio/webm'
    })

    onSend(file)
  }

  const getMinutesSecondsTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds - minutes * 60

    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds

    return `${displayMinutes}:${displaySeconds}`
  }

  const currentTime = getMinutesSecondsTime(recordingTime)

  const timePercentage = (recordingTime / MAX_RECORDING_TIME) * 100

  return (
    <div
      className="fixed bottom-14 bg-zinc-50 w-full p-2 z-10 border-y md:absolute dark:bg-zinc-700 dark:border-zinc-600"
      ref={ref}>
      <div className="max-w-md mx-auto flex gap-4 items-center justify-between">
        <p className="sm:text-xl w-24 text-center block">{currentTime}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-cyan-900">
          <div
            className="bg-cyan-700 h-2.5 rounded-full transition-all"
            style={{ width: `${timePercentage}%` }}></div>
        </div>
        <div className="flex">
          <button onClick={handleTogglePauseResume}>
            {isPaused && <PlayIcon />}
            {!isPaused && <PauseIcon />}
          </button>
          <button onClick={handleToggleStartStop}>
            {isRecording && <StopRecordIcon />}
            {!isRecording && <StartRecordIcon />}
          </button>
          <button onClick={handleSend} className="ml-3">
            <SendAudioIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
