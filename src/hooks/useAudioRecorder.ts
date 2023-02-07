import { useState, useCallback } from 'react'

export interface recorderControls {
  startRecording: () => void
  stopRecording: () => void
  togglePauseResume: () => void
  recordingBlob?: Blob
  isRecording: boolean
  isPaused: boolean
  recordingTime: number
}

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>()
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>()
  const [recordingBlob, setRecordingBlob] = useState<Blob>()

  const startTimer: () => void = () => {
    const interval = setInterval(() => {
      setRecordingTime((time) => time + 1)
    }, 1000)
    setTimerInterval(interval)
  }

  const stopTimer: () => void = () => {
    timerInterval != null && clearInterval(timerInterval)
    setTimerInterval(undefined)
  }

  const startRecording: () => void = useCallback(() => {
    if (timerInterval != null) return
    if (!navigator.mediaDevices?.getUserMedia) return

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setIsRecording(true)
        const recorder: MediaRecorder = new MediaRecorder(stream)
        setMediaRecorder(recorder)
        recorder.start()
        startTimer()

        recorder.addEventListener('dataavailable', (event) => {
          setRecordingBlob(event.data)
          recorder.stream.getTracks().forEach((t) => t.stop())
          setMediaRecorder(null)
        })
      })
      .catch((err) => console.log(err))
  }, [timerInterval])

  const stopRecording: () => void = () => {
    mediaRecorder?.stop()
    stopTimer()
    setRecordingTime(0)
    setIsRecording(false)
    setIsPaused(false)
  }

  const togglePauseResume: () => void = () => {
    if (isPaused) {
      setIsPaused(false)
      mediaRecorder?.resume()
      startTimer()
    } else {
      setIsPaused(true)
      stopTimer()
      mediaRecorder?.pause()
    }
  }

  return {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime
  }
}
