"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/card";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import { Search, Folder, Cloud, Code, Database, Edit, File } from "lucide-react";
import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/common/ParticlesBackground";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/avatar";

// Mock data for drives
const drives = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: `Drive ${["A", "B", "C", "D", "E"][i % 5]} - ${["Work", "Personal", "Projects", "Backup", "Shared"][i % 5]}`,
    description: "Store and manage your files securely with easy access and sharing options.",
    owner: {
      name: `${["Sarah", "John", "Emily", "Michael", "Jessica"][i % 5]} ${["Smith", "Doe", "Johnson", "Brown", "Davis"][i % 5]}`,
      avatar: `/avatars/avatar-${(i % 5) + 1}.jpg`,
    },
    lastUpdated: `${["Jan", "Feb", "Mar", "Apr", "May"][i % 5]} ${i + 1}, 2024`,
    image: `/drive-screenshots/drive-${(i % 5) + 1}.jpg`,
    type: ["Editing", "Data", "Programming", "Documents", "Backup"][Math.floor(Math.random() * 5)],
  }));

// Keywords for search
const keywords = ["Editing", "Data", "Programming", "Documents", "Backup", "Cloud Storage", "File Sharing"];

export default function DrivesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [filteredDrives, setFilteredDrives] = useState(drives);

  useEffect(() => {
    const filtered = drives.filter(
      (drive) =>
        (drive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drive.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedKeyword === "" || drive.type === selectedKeyword),
    );
    setFilteredDrives(filtered);
  }, [searchTerm, selectedKeyword]);

  // Function to get the icon based on the drive type
  const getDriveIcon = (type: string) => {
    switch (type) {
      case "Editing":
        return <Edit className="w-5 h-5" />;
      case "Data":
        return <Database className="w-5 h-5" />;
      case "Programming":
        return <Code className="w-5 h-5" />;
      case "Documents":
        return <File className="w-5 h-5" />;
      case "Backup":
        return <Cloud className="w-5 h-5" />;
      default:
        return <Folder className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <ParticlesBackground />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Your Drives
        </motion.h1>

        {/* Search and keywords section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative max-w-2xl mx-auto mb-6">
            <Input
              type="search"
              placeholder="Search drives..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {keywords.map((keyword) => (
              <Button
                key={keyword}
                variant={selectedKeyword === keyword ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedKeyword(keyword === selectedKeyword ? "" : keyword)}
              >
                {keyword}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Drives grid */}
        <div className="grid grid-cols-4 gap-6">
          {/* Row 1: 4 drive cards */}
          {filteredDrives.slice(0, 4).map((drive) => (
            <Card key={drive.id} className="flex flex-col">
              <CardHeader className="p-4">
                <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                  <img
                    src={drive.image || "/placeholder.svg"}
                    alt="Drive thumbnail"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {getDriveIcon(drive.type)}
                  <CardTitle className="text-lg">{drive.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <CardDescription className="mb-4">{drive.description}</CardDescription>
                <div className="flex items-center mt-auto">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={drive.owner.avatar} alt={drive.owner.name} />
                    <AvatarFallback>{drive.owner.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{drive.owner.name}</p>
                    <p className="text-muted-foreground">{drive.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Row 2: Drive card, Ad card, Drive card, Vertical Ad */}
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img
                  src={filteredDrives[4].image || "/placeholder.svg"}
                  alt="Drive thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center gap-2">
                {getDriveIcon(filteredDrives[4].type)}
                <CardTitle className="text-lg">{filteredDrives[4].name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredDrives[4].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredDrives[4].owner.avatar} alt={filteredDrives[4].owner.name} />
                  <AvatarFallback>{filteredDrives[4].owner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredDrives[4].owner.name}</p>
                  <p className="text-muted-foreground">{filteredDrives[4].lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Ad Space 1</p>
          </div>
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img
                  src={filteredDrives[5].image || "/placeholder.svg"}
                  alt="Drive thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center gap-2">
                {getDriveIcon(filteredDrives[5].type)}
                <CardTitle className="text-lg">{filteredDrives[5].name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredDrives[5].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredDrives[5].owner.avatar} alt={filteredDrives[5].owner.name} />
                  <AvatarFallback>{filteredDrives[5].owner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredDrives[5].owner.name}</p>
                  <p className="text-muted-foreground">{filteredDrives[5].lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="bg-muted p-4 rounded-lg flex items-center justify-center col-span-1 row-span-3">
            <p className="text-muted-foreground">Vertical Ad Space</p>
          </div>

          {/* Row 3: Drive card, Drive card, Ad card, Vertical Ad */}
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img
                  src={filteredDrives[6].image || "/placeholder.svg"}
                  alt="Drive thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center gap-2">
                {getDriveIcon(filteredDrives[6].type)}
                <CardTitle className="text-lg">{filteredDrives[6].name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredDrives[6].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredDrives[6].owner.avatar} alt={filteredDrives[6].owner.name} />
                  <AvatarFallback>{filteredDrives[6].owner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredDrives[6].owner.name}</p>
                  <p className="text-muted-foreground">{filteredDrives[6].lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img
                  src={filteredDrives[7].image || "/placeholder.svg"}
                  alt="Drive thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center gap-2">
                {getDriveIcon(filteredDrives[7].type)}
                <CardTitle className="text-lg">{filteredDrives[7].name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredDrives[7].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredDrives[7].owner.avatar} alt={filteredDrives[7].owner.name} />
                  <AvatarFallback>{filteredDrives[7].owner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredDrives[7].owner.name}</p>
                  <p className="text-muted-foreground">{filteredDrives[7].lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Ad Space 2</p>
          </div>

          {/* Row 4: Ad card, Drive card, Drive card, Vertical Ad */}
          <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Ad Space 3</p>
          </div>
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img
                  src={filteredDrives[8].image || "/placeholder.svg"}
                  alt="Drive thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center gap-2">
                {getDriveIcon(filteredDrives[8].type)}
                <CardTitle className="text-lg">{filteredDrives[8].name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredDrives[8].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredDrives[8].owner.avatar} alt={filteredDrives[8].owner.name} />
                  <AvatarFallback>{filteredDrives[8].owner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredDrives[8].owner.name}</p>
                  <p className="text-muted-foreground">{filteredDrives[8].lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img
                  src={filteredDrives[9].image || "/placeholder.svg"}
                  alt="Drive thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center gap-2">
                {getDriveIcon(filteredDrives[9].type)}
                <CardTitle className="text-lg">{filteredDrives[9].name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredDrives[9].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredDrives[9].owner.avatar} alt={filteredDrives[9].owner.name} />
                  <AvatarFallback>{filteredDrives[9].owner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredDrives[9].owner.name}</p>
                  <p className="text-muted-foreground">{filteredDrives[9].lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Row 5: 4 drive cards */}
          {filteredDrives.slice(10, 12).map((drive) => (
            <Card key={drive.id} className="flex flex-col">
              <CardHeader className="p-4">
                <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                  <img
                    src={drive.image || "/placeholder.svg"}
                    alt="Drive thumbnail"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {getDriveIcon(drive.type)}
                  <CardTitle className="text-lg">{drive.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <CardDescription className="mb-4">{drive.description}</CardDescription>
                <div className="flex items-center mt-auto">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={drive.owner.avatar} alt={drive.owner.name} />
                    <AvatarFallback>{drive.owner.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{drive.owner.name}</p>
                    <p className="text-muted-foreground">{drive.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}