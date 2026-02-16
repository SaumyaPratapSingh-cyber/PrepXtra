
import axios from 'axios';

async function verifyApi() {
    try {
        // 1. Fetch all subjects
        console.log("Fetching all subjects...");
        const subjectsRes = await axios.get('http://localhost:3000/api/core-subjects');
        if (subjectsRes.status !== 200) throw new Error("Failed to fetch subjects");
        console.log(`✅ Fetched ${subjectsRes.data.subjects.length} subjects`);

        // 2. Pick a subject (e.g., Operating Systems)
        const osSubject = subjectsRes.data.subjects.find((s: any) => s.name === "Operating Systems");
        if (!osSubject) throw new Error("Operating Systems subject not found");
        console.log(`✅ Found subject: ${osSubject.name} (${osSubject.slug})`);

        // 3. Fetch topic details (assuming we can get topic slug from somewhere or guess it)
        // Since we don't have topic slugs in the subject list response yet (maybe), let's check
        // The subject list might include topics if populated.
        // Let's try to fetch the subject detail to get topics

        console.log(`Fetching subject details for ${osSubject.slug}...`);
        const subjectDetailRes = await axios.get(`http://localhost:3000/api/core-subjects?slug=${osSubject.slug}`);
        if (!subjectDetailRes.data.topics || subjectDetailRes.data.topics.length === 0) {
            throw new Error("No topics found for Operating Systems");
        }
        console.log(`✅ Found ${subjectDetailRes.data.topics.length} topics for ${osSubject.name}`);

        const firstTopic = subjectDetailRes.data.topics[0];
        console.log(`Testing topic: ${firstTopic.title} (${firstTopic.slug})`);

        // 4. Fetch specific topic content
        console.log(`Fetching topic content for ${firstTopic.slug}...`);
        const topicRes = await axios.get(`http://localhost:3000/api/core-topics/${firstTopic.slug}`);

        const topicData = topicRes.data;
        if (!topicData.topic) throw new Error("Topic data missing in response");

        // Verify content existence
        if (!topicData.topic.content) throw new Error("Content field missing in topic");
        if (typeof topicData.topic.content !== 'string') throw new Error("Content is not a string");
        if (topicData.topic.content.length < 10) throw new Error("Content seems too short");

        console.log("✅ Topic content verified (Type: String, Length: " + topicData.topic.content.length + ")");

        // Verify resources (optional but good to check)
        if (topicData.topic.resources) {
            console.log(`✅ Found ${topicData.topic.resources.length} resources`);
        }

        console.log("\n🎉 API Verification Successful!");

    } catch (error: any) {
        console.error("❌ Verification Failed:", error.message);
        if (error.response) {
            console.error("Response:", error.response.status, error.response.data);
        }
    }
}

verifyApi();
