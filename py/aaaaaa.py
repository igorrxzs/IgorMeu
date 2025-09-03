#!/usr/bin/env python3

import os
import sys
import time
import cv2
from PIL import Image
import platform

def interpolate_frames(frame1, frame2, factor):
    """Interpolate between two frames."""
    if frame1 is None or frame2 is None:
        return frame1 if frame1 is not None else frame2
    return cv2.addWeighted(frame1, 1 - factor, frame2, factor, 0)

def frame_to_ascii(frame, width=80):
    """Convert a video frame to ASCII art."""
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    height, width_orig = gray.shape
    aspect_ratio = height / width_orig
    new_height = int(aspect_ratio * width * 0.43)
    resized = cv2.resize(gray, (width, new_height))
    img = Image.fromarray(resized)
    
    chars = "    :;;##"
    pixels = list(img.getdata())
    char_length = len(chars)
    ascii_str = ''.join([chars[min(pixel // 25, char_length - 1)] for pixel in pixels])
    return '\n'.join([ascii_str[i:i+width] for i in range(0, len(ascii_str), width)])

def play_video(video_path, max_duration=20, ascii_width=80, interpolation_factor=2):
    """Play a video as ASCII art in the terminal."""
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"[!] Error: Could not open video file {video_path}")
        return
    
    original_fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / original_fps
    fps = original_fps * interpolation_factor
    frame_delay = 1 / fps
    max_frames = int(fps * max_duration) if max_duration else frame_count

    print(f"[*] ASCII Video Player")
    print(f"[*] Video: {video_path}")
    print(f"[*] FPS: {fps:.2f}")
    print(f"[*] Duration: {min(duration, max_duration):.2f} seconds")
    print(f"[*] Press Ctrl+C to stop")
    time.sleep(2)
    
    try:
        frame_index = 0
        start_time = time.time()

        ret, prev_frame = cap.read()
        if not ret:
            print("[!] Error: Could not read the first frame")
            return

        current_frame = prev_frame

        while frame_index < max_frames:
            if frame_index % interpolation_factor == 0:
                prev_frame = current_frame
                ret, current_frame = cap.read()
                if not ret:
                    break
                display_frame = current_frame
            else:
                interp_factor = (frame_index % interpolation_factor) / interpolation_factor
                display_frame = interpolate_frames(prev_frame, current_frame, interp_factor)
            
            target_time = start_time + (frame_index / fps)
            if time.time() > target_time + frame_delay:
                frame_index += 1
                continue
            
            sys.stdout.write("\033[H\033[J")
            ascii_frame = frame_to_ascii(display_frame, width=ascii_width)
            sys.stdout.write(f"Frame: {frame_index+1}/{min(frame_count, max_frames)} | Time: {(frame_index/fps):.2f}s\n")
            sys.stdout.write(ascii_frame)
            sys.stdout.flush()

            sleep_time = max(0, target_time - time.time())
            if sleep_time > 0:
                time.sleep(sleep_time)
            
            frame_index += 1

        elapsed_time = time.time() - start_time
        fps_achieved = frame_index / elapsed_time if elapsed_time > 0 else 0
        sys.stdout.write("\033[H\033[J")
        print(f"[+] Playback completed")
        print(f"[+] Frames played: {frame_index}")
        print(f"[+] Actual FPS: {fps_achieved:.2f}")

    except KeyboardInterrupt:
        print("\n[!] Playback interrupted")
    finally:
        cap.release()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        video_path = sys.argv[1]
    else:
        video_path = "video.mp4"
    
    if not os.path.exists(video_path):
        print(f"[!] Error: Video file '{video_path}' not found")
        print(f"[!] Usage: python {sys.argv[0]} [video_file]")
        sys.exit(1)
    
    if platform.system() == 'Windows':
        import ctypes
        kernel32 = ctypes.windll.kernel32
        kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)
    
    play_video(video_path, interpolation_factor=3)