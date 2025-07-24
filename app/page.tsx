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
  DoorOpen,
  Plus,
  UserRoundSearch,
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
  const [resolvedCount, setResolvedCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

 useEffect(() => {
  const fetchIncidents = async () => {
    try {
      // Fetch unresolved incidents
      const unresolvedResponse = await fetch('/api/incidents?resolved=false');
      
      if (!unresolvedResponse.ok) {
        throw new Error(`HTTP error! status: ${unresolvedResponse.status}`);
      }
      
      const unresolvedText = await unresolvedResponse.text();
      if (unresolvedText) {
        const unresolvedData = JSON.parse(unresolvedText);
        setIncidents(Array.isArray(unresolvedData) ? unresolvedData : []);
      }
      
      // Fetch resolved incidents count
      const resolvedResponse = await fetch('/api/incidents?resolved=true');
      
      if (resolvedResponse.ok) {
        const resolvedText = await resolvedResponse.text();
        if (resolvedText) {
          const resolvedData = JSON.parse(resolvedText);
          setResolvedCount(Array.isArray(resolvedData) ? resolvedData.length : 0);
        }
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
      setIncidents([]); // Set empty array on error
      setResolvedCount(0);
    } finally {
      setLoading(false);
    }
  };

  fetchIncidents();
}, []);


  const resolveIncident = async (id: number) => {
    setIncidents(incidents.map(inc => inc.id === id ? { ...inc, resolved: true } : inc));
    await fetch(`/api/incidents/${id}/resolve`, { method: 'PATCH' });
    setIncidents(incidents.filter(inc => inc.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6">
      {/* Navbar */}
      <nav className="flex flex-wrap md:flex-nowrap items-center justify-between py-3 bg-[#131313] border-b border-[#393732] relative">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <span className="text-black font-bold text-xs">M</span>
          </div>
          <span className="text-lg font-bold">MANDLACX</span>
        </div>

        <div className="flex flex-wrap items-center space-x-4 md:space-x-6 relative z-10 mb-2 md:mb-0">
          <div
            className="absolute inset-0 pointer-events-none blur-2xl"
            style={{
              background: `radial-gradient(circle at center, #D0A70459 35%, transparent 100%)`,
            }}
          ></div>

          <Button variant="ghost" size="sm" className="text-[#ffcc00] hover:bg-[#393732] text-sm">
            <Grid3X3 className="w-3 h-3 mr-1" />
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#393732] text-sm">
            <Camera className="w-3 h-3 mr-1" />
            Cameras
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#393732] text-sm">
            <ImageIcon className="w-3 h-3 mr-1" />
            Scenes
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#393732] text-sm">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Incidents
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#393732] text-sm">
            <Users className="w-3 h-3 mr-1" />
            Users
          </Button>
        </div>

        <div className="flex items-center space-x-2 z-10">
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

      <div className="flex flex-col lg:flex-row">
        {/* Incident Player (Left) */}
        <Card className="w-full lg:w-3/4 mx-0 lg:mx-3 mt-3 border-amber-200 border border-[#393732]">
          <div className="bg-black h-64 sm:h-80 md:h-96 lg:h-[22rem] relative">
            <img src="/thumbnails/gun1.jpg" alt="Video Feed" className="max-h-full w-full object-cover" />
            <div className="absolute bottom-2 right-2 flex space-x-2 z-50">
              <img src="/thumbnails/gun1.jpg" alt="Camera 1" className="w-20 sm:w-24 h-16 border border-white" />
              <img src="/thumbnails/gun1.jpg" alt="Camera 2" className="w-20 sm:w-24 h-16 border border-white" />
            </div>
          </div>
        </Card>

        {/* Incident List (Right) */}
        <Card className="w-full lg:w-2/4 mr-0 lg:mr-3 mt-3 bg-[#131313] border-l border-[#393732] p-4 max-h-[26rem] overflow-auto">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-y-2">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-[#ef4444]" />
              <span className="text-sm font-semibold text-white">{incidents.length} Unresolved Incidents</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <DoorOpen className="w-4 h-4 bg-[#ef4444] rounded-full" />
              <Plus className="w-4 h-4 bg-[#f97316] rounded-full" />
              <UserRoundSearch className="w-4 h-4 bg-[#3b82f6] rounded-full" />
              <div className="border rounded-xl px-2 bg-neutral-900">
                <span className="text-[10px] text-[#22c55e]">✓ {resolvedCount - incidents.length} resolved incidents</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {incidents.map((incident) => (
              <Card key={incident.id} className="bg-[#232323] border-[#393732]">
                <CardContent className="p-2">
                  <div className="flex flex-col sm:flex-row sm:items-center space-x-0 sm:space-x-2">
                    <img
                      src={incident.thumbnailUrl || "/placeholder.svg"}
                      alt="Incident thumbnail"
                      className="w-full sm:w-20 h-20 rounded object-cover mb-2 sm:mb-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 mb-2">
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
                      <div className="text-[10px] text-[#78716c] mb-1">
                        🕐 {new Date(incident.tsStart).toLocaleTimeString()} - {new Date(incident.tsEnd).toLocaleTimeString()}
                      </div>
                    </div>
                    <Button
                      onClick={() => resolveIncident(incident.id)}
                      variant="ghost"
                      size="lg"
                      className="text-[#ffcc00] hover:text-[#ffcc00] hover:bg-[#393732] text-[13px] mt-2 sm:mt-0 sm:ml-auto"
                    >
                      Resolve →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      {/* Video Controls */}
      <div className="bg-[#131313] my-3 p-3 border-[#393732] rounded-xl">
        <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-6">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-pointer">
            <SkipBack className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-pointer">
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-pointer">
            <RotateCw className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-pointer">
            <SkipForward className="w-3 h-3" />
          </Button>
          <span className="text-xs">03:12:37 (15-Jun-2025)</span>
          <span className="text-xs">1x</span>
        </div>
      </div>
    </div>
  );
}
