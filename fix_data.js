const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data/data.json', 'utf8'));

// Find the index of "🗺️ PROGRESSION ROADMAP"
const roadmapIndex = data.findIndex(t => t.id === "🗺️ PROGRESSION ROADMAP");

if (roadmapIndex !== -1) {
    const roadmapBuckets = data[roadmapIndex].buckets;
    
    // The topic after roadmap is Topic 24
    const topic24Buckets = data[roadmapIndex + 1].buckets;
    
    // Move roadmap's buckets to Topic 24
    data[roadmapIndex + 1].buckets = roadmapBuckets;
    
    // Move Topic 24's buckets to Topic 25 (which is right after Topic 24)
    data[roadmapIndex + 2].buckets = topic24Buckets;
    
    // Delete the Progression Roadmap topic entirely
    data.splice(roadmapIndex, 1);
    
    fs.writeFileSync('src/data/data.json', JSON.stringify(data, null, 2));
    console.log("Successfully fixed topic alignment and removed Progression Roadmap!");
} else {
    console.log("Progression Roadmap not found.");
}
