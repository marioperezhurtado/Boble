import { useEffect, useRef } from 'react'
import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import useOnClickOutside from '@/hooks/useOnClickOutside'

import StartRecordIcon from '@/assets/StartRecordingIcon'
import StopRecordIcon from '@/assets/StopRecordIcon'
import ResumeRecordIcon from '@/assets/ResumeRecordIcon'
import PauseRecordIcon from '@/assets/PauseRecordIcon'
import SendAudioIcon from '@/assets/SendAudioIcon'

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
    isRecording,
    isPaused,
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

  const handleTogglePauseResume = () => {
    if (!isRecording) return
    togglePauseResume()
  }

  const handleToggleStartStop = () => {
    if (isRecording) {
      stopRecording()
      return
    }
    startRecording()
  }

  const handleSend = async () => {
    stopRecording()
    if (!recordingBlob) return

    const file = new File([recordingBlob], 'audio.webm', {
      type: 'audio/webm'
    })

    onSend(file)
    onClose()
  }

  useEffect(() => {
    startRecording() // Start recording on mount
  }, [])

  useEffect(() => {
    if (recordingTime === MAX_RECORDING_TIME) {
      togglePauseResume()
    }
    if (recordingTime > MAX_RECORDING_TIME) {
      stopRecording()
    }
  }, [recordingTime])

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
      className="fixed bottom-14 bg-zinc-50 w-full py-5 z-10 border-y md:absolute dark:bg-zinc-700 dark:border-zinc-600"
      ref={ref}>
      <div className="max-w-md mx-auto flex gap-4 items-center justify-between">
        <p className="sm:text-xl w-24 text-center block">{currentTime}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-cyan-900">
          <div
            className="bg-cyan-700 h-2.5 rounded-full transition-all"
            style={{ width: `${timePercentage}%` }}></div>
        </div>
        <div className="flex">
          <button
            onClick={handleTogglePauseResume}
            className="p-1"
            title="Pause / resume recording">
            {isPaused && <ResumeRecordIcon />}
            {!isPaused && <PauseRecordIcon />}
          </button>
          <button
            onClick={handleToggleStartStop}
            className="p-1"
            title="Start / stop recording">
            {isRecording && <StopRecordIcon />}
            {!isRecording && <StartRecordIcon />}
          </button>
          {!isRecording && recordingBlob && (
            <button onClick={handleSend} className="p-1">
              <SendAudioIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
