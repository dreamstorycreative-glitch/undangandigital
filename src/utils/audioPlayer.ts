/**
 * RuangMomen Romantic Web Audio Synthesizer
 * Plays gentle romantic arpeggios/melodies smoothly across all browsers
 * without requiring external sound files that might fail or get blocked by CORS.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: any = null;
  private currentTrackId: string | null = null;
  private volumeNode: GainNode | null = null;
  private masterVolume = 0.25;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.volumeNode = this.ctx.createGain();
        this.volumeNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
        this.volumeNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTrack(trackId: string, customNotes?: number[]) {
    this.initContext();
    if (!this.ctx || !this.volumeNode) return;

    this.stop();
    this.isPlaying = true;
    this.currentTrackId = trackId;

    // Romantic chord progression notes (pentatonic / major chords)
    const baseFrequencies = customNotes && customNotes.length > 0 
      ? customNotes 
      : [261.63, 329.63, 392.00, 440.00, 523.25, 659.25, 523.25, 392.00];

    let noteIdx = 0;

    const playChime = () => {
      if (!this.isPlaying || !this.ctx || !this.volumeNode) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sine + gentle triangle for warmth
      osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
      
      const freq = baseFrequencies[noteIdx % baseFrequencies.length];
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Envelope: gentle attack, lingering romantic release
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.3, now + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      osc.connect(noteGain);
      noteGain.connect(this.volumeNode);

      osc.start(now);
      osc.stop(now + 1.8);

      noteIdx++;
    };

    // Initial chime
    playChime();
    this.intervalId = setInterval(playChime, 750);
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrackId = null;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrackId(): string | null {
    return this.currentTrackId;
  }
}

export const audioPlayer = new RomanticAudioEngine();
