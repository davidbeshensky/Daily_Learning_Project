"use client";
import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
const AudioVisualizer = () => {
    // References for audio components
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const sourceRef = useRef(null);
    // References for Three.js components
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const animationIdRef = useRef(null);
    const barsRef = useRef([]);
    // State variables
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // Initialize AudioContext and Three.js when component mounts
    useEffect(() => {
        // Initialize AudioContext
        audioContextRef.current = new (window.AudioContext ||
            window.webkitAudioContext)();
        // Initialize Three.js Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        // Initialize Camera
        const camera = new THREE.PerspectiveCamera(75, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
        );
        camera.position.z = 40;
        cameraRef.current = camera;
        // Initialize Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        rendererRef.current = renderer;
        // Handle window resize
        const handleResize = () => {
            if (cameraRef.current && rendererRef.current) {
                const width = window.innerWidth;
                const height = window.innerHeight;
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(width, height);
            }
        };
        window.addEventListener("resize", handleResize);
        // Clean up on unmount
        return () => {
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            window.removeEventListener("resize", handleResize);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);
    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file && audioContextRef.current) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const arrayBuffer = e.target?.result;
                if (arrayBuffer) {
                    audioContextRef
                        .current.decodeAudioData(arrayBuffer)
                        .then((decodedAudio) => {
                        setAudioBuffer(decodedAudio);
                    })
                        .catch((error) => console.error("Error decoding audio data:", error));
                }
                else {
                    console.error("Failed to read file.");
                }
            };
            reader.readAsArrayBuffer(file);
        }
        else {
            console.error("No file selected or AudioContext not initialized.");
        }
    };
    // Handle play button click
    const handlePlay = () => {
        if (audioBuffer &&
            audioContextRef.current &&
            sceneRef.current &&
            cameraRef.current &&
            rendererRef.current) {
            const audioContext = audioContextRef.current;
            // Resume audio context if suspended
            if (audioContext.state === "suspended") {
                audioContext.resume();
            }
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            source.start();
            sourceRef.current = source;
            analyserRef.current = analyser;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            dataArrayRef.current = dataArray;
            const scene = sceneRef.current;
            const bars = [];
            // Create bars
            for (let i = 0; i < bufferLength; i++) {
                const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
                const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const bar = new THREE.Mesh(geometry, material);
                // Position the bars
                const x = (i - bufferLength / 2) * 0.6;
                bar.position.set(x, 0, 0);
                scene.add(bar);
                bars.push(bar);
            }
            // Store bars in ref for logging
            barsRef.current = bars;
            // Animation function
            const animate = () => {
                if (!analyserRef.current ||
                    !dataArrayRef.current ||
                    !rendererRef.current ||
                    !sceneRef.current ||
                    !cameraRef.current) {
                    return;
                }
                animationIdRef.current = requestAnimationFrame(animate);
                // Get audio data
                analyserRef.current.getByteFrequencyData(dataArrayRef.current);
                //scaling exponent for audio data
                const N = dataArrayRef.current.length;
                const desiredScaleFactor = dataArrayRef.current[0] / (dataArrayRef.current[N - 1] || 0.1);
                const p = Math.log(desiredScaleFactor) / Math.log(N);
                // Update bars
                for (let i = 0; i < barsRef.current.length; i++) {
                    const value = dataArrayRef.current[i];
                    const scalingFactor = (i + 1 + p);
                    const scale = (value / 128) * scalingFactor;
                    barsRef.current[i].scale.y = Math.max(scale, 0.1); // Avoid scale of 0
                    barsRef.current[i].material.color.setHSL(i / N, 1, 0.5);
                }
                // Render the scene
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            };
            animate();
            setIsPlaying(true);
            // Stop audio when it ends
            source.onended = () => {
                stopAudio();
            };
        }
        else {
            console.error("AudioBuffer, AudioContext, or Three.js components are not available.");
        }
    };
    // Handle stop button click
    const stopAudio = () => {
        if (sourceRef.current) {
            sourceRef.current.stop();
        }
        if (animationIdRef.current !== null) {
            cancelAnimationFrame(animationIdRef.current);
        }
        setIsPlaying(false);
        // Remove all objects from the scene
        if (sceneRef.current) {
            while (sceneRef.current.children.length > 0) {
                sceneRef.current.remove(sceneRef.current.children[0]);
            }
        }
    };
    // Function to log data
    const logData = () => {
        if (dataArrayRef.current && barsRef.current) {
            console.log("Current Frequency Data:", Array.from(dataArrayRef.current));
            console.log("Bars Scales:", barsRef.current.map((bar) => bar.scale.y));
        }
        else {
            console.log("No data available.");
        }
    };
    // Clean up on unmount
    useEffect(() => {
        return () => {
            stopAudio();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);
    return (<div>
      <h2>Upload an MP3 File</h2>
      <input type="file" accept="audio/*" onChange={handleFileUpload}/>
      <div>
        <button onClick={handlePlay} disabled={!audioBuffer || isPlaying} className="border-2 border-white mr-2 mt-1 p-1">
          Play
        </button>
        <button onClick={stopAudio} disabled={!isPlaying} className="border-2 border-white mr-2 mt-1 p-1">
          Stop
        </button>
        <button onClick={logData} disabled={!isPlaying} className="border-2 border-white mr-2 mt-1 p-1">
          Log Data
        </button>
      </div>
      <canvas ref={canvasRef} style={{ display: "block" }}/>
    </div>);
};
export default AudioVisualizer;
