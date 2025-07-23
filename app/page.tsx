'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  DoorOpen ,
  Plus ,
  UserRoundSearch ,
  Camera,
  Grid3X3,
  ImageIcon,
  AlertTriangle,
  Users,
  ChevronDown,
  AlertCircle,
} from "lucide-react"

interface Incident {
  id: number;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: { name: string; location: string };
}

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

    // const [incidents, setIncidents] = useState<Incident[]>([]);  // Unresolved incidents
  const [resolvedCount, setResolvedCount] = useState<number>(0);  // NEW: For resolved count
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch unresolved incidents (as before)
    fetch('/api/incidents?resolved=false')
      .then(res => res.json())
      .then(data => {
        setIncidents(data);
        setLoading(false);
      });

    // NEW: Fetch resolved count (adjust your API to support ?resolved=true)
    fetch('/api/incidents?resolved=true')  // Or use a separate endpoint for count
      .then(res => res.json())
      .then(data => setResolvedCount(data.length));  // Or use Prisma count in API for efficiency
  }, []);

  const resolveIncident = async (id: number) => {
    // Optimistic UI: Fade out immediately
    setIncidents(incidents.map(inc => inc.id === id ? { ...inc, resolved: true } : inc));

    // API call
    await fetch(`/api/incidents/${id}/resolve`, { method: 'PATCH' });

    // Remove from list after API success
    setIncidents(incidents.filter(inc => inc.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 bg-[#131313] border-b border-[#393732] relative">
    

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black font-bold text-xs">M</span>
            </div>
            <span className="text-lg font-bold">MANDLACX</span>
          </div>
        {/* Existing content with relative positioning to appear above gradient */}
        <div className="flex items-center space-x-8 relative z-10">
           {/* Add gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none blur-2xl"
          style={{
            background: `radial-gradient(circle at center, #D0A70459 35%, transparent 100%)`,
          }}
        ></div>
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#ffcc00] hover:text-[#ffcc00] hover:bg-[#393732] text-sm"
            >
              <Grid3X3 className="w-3 h-3 mr-1" />
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-[#393732] text-sm">
              <Camera className="w-3 h-3 mr-1" />
              Cameras
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-[#393732] text-sm">
              <ImageIcon className="w-3 h-3 mr-1" />
              Scenes
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-[#393732] text-sm">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Incidents
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-[#393732] text-sm">
              <Users className="w-3 h-3 mr-1" />
              Users
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 relative z-10">
          <Avatar className="w-7 h-7">
            <AvatarImage src="/placeholder.svg?height=28&width=28" />
            <AvatarFallback className="text-xs">MA</AvatarFallback>
          </Avatar>
          <div className="text-xs">
            <div className="font-medium">Mohammed Ajhas</div>
            <div className="text-[#78716c]">ajhas@mandlac.com</div>
          </div>
          <ChevronDown className="w-3 h-3 text-[#78716c]" />
        </div>
      </nav>

      <div className="flex">
        {/* Incident Player (Left) */}
        <div className="w-3/4 p-4">
          <div className="bg-black h-96 flex items-center justify-center">
            <img src="/placeholder-video.jpg" alt="Video Feed" className="max-h-full" /> {/* Static image */}
          </div>
          <div className="flex mt-2">
            <img src="/thumbnails/camera1.jpg" alt="Camera 1" className="w-24 h-16 mr-2" />
            <img src="/thumbnails/camera2.jpg" alt="Camera 2" className="w-24 h-16" />
          </div>
          {/* Optional Timeline here */}
          
        </div>

        {/* Incident List (Right) */}
        <Card className="w-2/4 mr-3 mt-3 bg-[#131313] border-l border-[#393732] p-4 h-96 overflow-auto"
  style={{
    scrollbarWidth: 'none',          // Firefox
    msOverflowStyle: 'none',         // IE 10+
  }}
>
  <div
    style={{
      overflow: 'auto',
    }}
    className="hover:[&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:hidden"
  >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-[#ef4444]" />
              <span className="text-sm font-semibold">{incidents.length} Unresolved Incidents</span>
            </div>
            <div className="flex flex-row items-center">
              <DoorOpen className="w-4 h-4 bg-[#ef4444] rounded-full "></DoorOpen>
              <Plus  className="w-4 h-4 bg-[#f97316] rounded-full"></Plus >
              <UserRoundSearch  className="w-4 h-4 bg-[#3b82f6] rounded-full"></UserRoundSearch >
              <span className="text-[10px] text-[#22c55e] ">✓ {resolvedCount-incidents.length} resolved incidents</span>
            </div>
          </div>

          <div className="space-y-2">
            {incidents.map((incident) => (
              <Card key={incident.id} className="bg-[#232323] border-[#393732]">
                <CardContent className="p-2">
                  <div className="flex items-start space-x-2">
                    <img
                      src={incident.thumbnailUrl || "/placeholder.svg"}
                      alt="Incident thumbnail"
                      className="w-12 h-8 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 mb-1">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-1 py-0.5 h-auto ${
                            incident.type === "Gun Threat" ? "bg-[#ef4444] text-white" : "bg-[#f97316] text-white"
                          }`}
                        >
                          {incident.type}
                        </Badge>
                      </div>
                      <div className="text-[10px] text-[#78716c] mb-0.5">📹 {incident.camera.location}</div>
                      <div className="text-[10px] text-[#78716c] mb-1">🕐 {new Date(incident.tsStart).toLocaleTimeString()} - {new Date(incident.tsEnd).toLocaleTimeString()}</div>
                      </div>
                      <Button
                        onClick={() => resolveIncident(incident.id)}
                        variant="ghost"
                        size="lg"
                        className="text-[#ffcc00] hover:text-[#ffcc00] hover:bg-[#393732] text-[12px]  px-1"
                      >
                        Resolve →
                      </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
