import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import AudioRecord from './AudioRecord'

vi.mock('@/hooks/useAudioRecorder')

describe('AudioRecord', async () => {
  const onClose = vi.fn()
  const onSend = vi.fn()
  const startRecording = vi.fn()
  const stopRecording = vi.fn()
  const togglePauseResume = vi.fn()

  const { useAudioRecorder }: { useAudioRecorder: any } = await import(
    '@/hooks/useAudioRecorder'
  )

  useAudioRecorder.mockReturnValue({
    startRecording,
    stopRecording,
    togglePauseResume,
    isRecording: false,
    isPaused: false,
    recordingTime: 95,
    recordingBlob: new Blob()
  })

  test('Starts recording on mount', () => {
    render(<AudioRecord onClose={onClose} onSend={onSend} />)

    expect(startRecording).toHaveBeenCalled()
  })

  test('Renders recording time with 00:00 format', () => {
    expect(screen.getByText('01:35')).toBeTruthy()
  })

  test('Can send the recording when the recording blob is available and recording is stopped', () => {
    const sendButton = screen.getByTitle('Send')

    fireEvent.click(sendButton)

    expect(stopRecording).toHaveBeenCalled()
    expect(onSend).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })

  test('Starts / Stops the recording', () => {
    const startButton = screen.getByTitle('Start')

    fireEvent.click(startButton)

    expect(startRecording).toHaveBeenCalled()

    useAudioRecorder.mockReturnValueOnce({
      startRecording,
      stopRecording,
      togglePauseResume,
      isRecording: true,
      isPaused: false,
      recordingTime: 95,
      recordingBlob: new Blob()
    })

    render(<AudioRecord onClose={onClose} onSend={onSend} />)

    const stopButton = screen.getByTitle('Stop')

    fireEvent.click(stopButton)

    expect(stopRecording).toHaveBeenCalled()
  })

  test('Pauses / Resumes the recording', () => {
    useAudioRecorder.mockReturnValueOnce({
      startRecording,
      stopRecording,
      togglePauseResume,
      isRecording: true,
      isPaused: false,
      recordingTime: 95,
      recordingBlob: new Blob()
    })

    render(<AudioRecord onClose={onClose} onSend={onSend} />)

    const pauseButton = screen.getAllByTitle('Pause')[1]

    fireEvent.click(pauseButton)

    expect(togglePauseResume).toHaveBeenCalled()

    useAudioRecorder.mockReturnValueOnce({
      startRecording,
      stopRecording,
      togglePauseResume,
      isRecording: true,
      isPaused: true,
      recordingTime: 95,
      recordingBlob: new Blob()
    })

    render(<AudioRecord onClose={onClose} onSend={onSend} />)

    const resumeButton = screen.getByTitle('Resume')

    fireEvent.click(resumeButton)

    expect(togglePauseResume).toHaveBeenCalledTimes(2)
  })

  test('Does not toggles pause / resume if the recording if not started', () => {
    useAudioRecorder.mockReturnValueOnce({
      startRecording,
      stopRecording,
      togglePauseResume,
      isRecording: false,
      isPaused: false,
      recordingTime: 95,
      recordingBlob: new Blob()
    })

    render(<AudioRecord onClose={onClose} onSend={onSend} />)

    const pauseButton = screen.getAllByTitle('Pause')[0]

    fireEvent.click(pauseButton)

    expect(togglePauseResume).toHaveBeenCalledTimes(2)
  })
})
