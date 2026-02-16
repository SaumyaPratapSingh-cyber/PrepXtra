
import { frontendRoadmap } from './frontend';
import { backendRoadmap } from './backend';
import { devopsRoadmap } from './devops';
import { fullstackRoadmap } from './fullstack';
import { reactRoadmap } from './react';
import { dsaRoadmap } from './dsa';
import { aiEngineerRoadmap } from './ai-engineer';
import { cyberSecurityRoadmap } from './cyber-security';
import { androidRoadmap } from './android';
import { systemDesignRoadmap } from './system-design';
import { dataAnalystRoadmap } from './data-analyst';
import { sqlRoadmap } from './sql';
import { mlRoadmap } from './ml';
import { dataEngineerRoadmap } from './data-engineer';
import { dockerRoadmap } from './docker';
import { iosRoadmap } from './ios';
import { nodejsRoadmap } from './nodejs';
import { pythonRoadmap } from './python';
import { javaRoadmap } from './java';
import { kubernetesRoadmap } from './kubernetes';
import { awsRoadmap } from './aws';
import { gitRoadmap } from './git';
import { mongodbRoadmap } from './mongodb';
import { postgresqlRoadmap } from './postgresql';
import { flutterRoadmap } from './flutter';
import { goRoadmap } from './go';
import { rustRoadmap } from './rust';
import { angularRoadmap } from './angular';
import { vueRoadmap } from './vue';
import { frontendBeginnerRoadmap } from './frontend-beginner';
import { apiSecurityRoadmap } from './api-security';
import { gameDeveloperRoadmap } from './game-developer';
import { blockchainRoadmap } from './blockchain';
import { uxDesignRoadmap } from './ux-design';
import { backendBeginnerRoadmap } from './backend-beginner';
import { devopsBeginnerRoadmap } from './devops-beginner';
import { RoadmapTrack } from './types';

export const roadmaps: Record<string, RoadmapTrack> = {
    'frontend': frontendRoadmap,
    'backend': backendRoadmap,
    'devops': devopsRoadmap,
    'fullstack': fullstackRoadmap,
    'react': reactRoadmap,
    'dsa': dsaRoadmap,
    'ai-engineer': aiEngineerRoadmap,
    'cyber-security': cyberSecurityRoadmap,
    'android': androidRoadmap,
    'system-design': systemDesignRoadmap,
    'data-analyst': dataAnalystRoadmap,
    'sql': sqlRoadmap,
    'ml': mlRoadmap,
    'data-engineer': dataEngineerRoadmap,
    'docker': dockerRoadmap,
    'ios': iosRoadmap,
    'nodejs': nodejsRoadmap,
    'python': pythonRoadmap,
    'java': javaRoadmap,
    'kubernetes': kubernetesRoadmap,
    'aws': awsRoadmap,
    'git': gitRoadmap,
    'mongodb': mongodbRoadmap,
    'postgresql': postgresqlRoadmap,
    'flutter': flutterRoadmap,
    'go': goRoadmap,
    'rust': rustRoadmap,
    'angular': angularRoadmap,
    'vue': vueRoadmap,
    'frontend-beginner': frontendBeginnerRoadmap,
    'api-security': apiSecurityRoadmap,
    'game-developer': gameDeveloperRoadmap,
    'blockchain': blockchainRoadmap,
    'ux-design': uxDesignRoadmap,
    'backend-beginner': backendBeginnerRoadmap,
    'devops-beginner': devopsBeginnerRoadmap,
};

export type { RoadmapTrack, RoadmapNode, Resource, DayPlan } from './types';
