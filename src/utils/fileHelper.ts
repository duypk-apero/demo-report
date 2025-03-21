import { MarkdownFile } from '../types';
import fs from 'fs';
import path from 'path';

// Improved date formatting function
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date().toLocaleDateString('en-US', options);
}

// Static data for GitHub Pages deployment and fallback
const staticMarkdownFiles: MarkdownFile[] = [
  {
    name: 'comprehensive_development_plan.md',
    path: 'comprehensive_development_plan.md',
    content: `# Comprehensive Development Plan

## Introduction
This document outlines the comprehensive development plan for our application. It includes timelines, resource allocation, and technical specifications.

## Timeline
- Phase 1: Planning and Design (2 weeks)
- Phase 2: Core Development (4 weeks)
- Phase 3: Testing and Refinement (2 weeks)
- Phase 4: Deployment and Launch (1 week)

## Resource Allocation
- Frontend Development: 3 developers
- Backend Development: 2 developers
- QA Testing: 2 testers
- DevOps: 1 engineer

## Technical Specifications
The application will be built using React for the frontend and Node.js for the backend, with MongoDB as the database solution.`,
    lastModified: formatDate('2023-03-21T10:53:00'),
    size: '8.4 KB'
  },
  {
    name: 'ai_integration_approach.md',
    path: 'ai_integration_approach.md',
    content: `# AI Integration Approach

## Overview
This document details our approach to integrating AI capabilities into our application, focusing on user experience enhancement and automated processes.

## Key AI Features
- Natural Language Processing for user queries
- Recommendation engine based on user behavior
- Automated content categorization
- Sentiment analysis for user feedback

## Implementation Strategy
We will use a combination of pre-trained models and custom-trained algorithms to achieve our AI goals. The implementation will be phased, starting with basic features and gradually introducing more complex capabilities.

## Success Metrics
- Reduction in user search time by 30%
- Increase in user engagement by 25%
- 90% accuracy in content categorization
- 85% user satisfaction with AI-powered recommendations`,
    lastModified: formatDate('2023-03-21T10:53:00'),
    size: '7.6 KB'
  },
  {
    name: 'implementation_strategy.md',
    path: 'implementation_strategy.md',
    content: `# Implementation Strategy

## Approach
Our implementation strategy focuses on iterative development with continuous integration and deployment. We will use agile methodologies to ensure flexibility and responsiveness to changing requirements.

## Development Phases
1. **Foundation Building**
   - Setup development environment
   - Establish code repositories
   - Define coding standards

2. **Core Feature Development**
   - User authentication system
   - Data management layer
   - Basic UI components

3. **Advanced Feature Integration**
   - Third-party API connections
   - Advanced user interactions
   - Performance optimizations

4. **Testing and Refinement**
   - Comprehensive test suite
   - User acceptance testing
   - Performance benchmarking

## Deployment Strategy
We will use a blue-green deployment approach to minimize downtime and risk. Containerization with Docker will ensure consistent environments across development, testing, and production.`,
    lastModified: formatDate('2023-03-21T10:53:00'),
    size: '5.2 KB'
  },
  {
    name: 'technical_architecture.md',
    path: 'technical_architecture.md',
    content: `# Technical Architecture

## Overview
This document outlines the technical architecture of our application, detailing the components, interactions, and technologies used.

## System Components
- **Frontend Layer**: React with Redux for state management
- **API Layer**: Express.js REST API
- **Service Layer**: Business logic implementation
- **Data Layer**: MongoDB with Mongoose ODM
- **Caching Layer**: Redis for performance optimization

## Infrastructure
- AWS EC2 for application hosting
- AWS S3 for static file storage
- CloudFront for CDN
- RDS for database backup

## Security Architecture
- JWT for authentication
- Role-based access control
- Data encryption at rest and in transit
- Regular security audits and penetration testing

## Scalability Considerations
The architecture is designed for horizontal scaling, with stateless application servers and distributed caching to handle increased load.`,
    lastModified: formatDate('2023-03-21T10:53:00'),
    size: '4.2 KB'
  },
  {
    name: 'kmm_analysis.md',
    path: 'kmm_analysis.md',
    content: `# KMM Analysis

## Introduction
This document presents an analysis of Kotlin Multiplatform Mobile (KMM) as a potential solution for our cross-platform mobile development needs.

## Key Benefits
- Shared business logic across iOS and Android
- Native UI for each platform
- Reduced development time for cross-platform features
- Strong type safety and modern language features

## Challenges
- Learning curve for developers not familiar with Kotlin
- Still maturing ecosystem compared to React Native or Flutter
- Integration with existing native codebases
- Limited third-party library support

## Recommendation
Based on our team's expertise and project requirements, we recommend adopting KMM for our new mobile application development. The initial investment in learning and setup will be offset by the long-term benefits of code sharing and maintenance.`,
    lastModified: formatDate('2023-03-21T10:53:00'),
    size: '2.6 KB'
  }
];

const isServerSide = typeof window === 'undefined';

// Get the root directory of the project
const getRootDir = () => process.cwd();
// Parent directory where .md files are stored
const getParentDir = () => path.resolve(getRootDir(), '..');

export function getMarkdownFiles(): MarkdownFile[] {
  // In development/server mode, read actual files
  if (isServerSide) {
    try {
      const parentDir = getParentDir();
      // Read all files in the directory
      const files = fs.readdirSync(parentDir);
      
      // Filter only .md files
      const mdFiles = files.filter(file => file.endsWith('.md'));
      
      // Map to MarkdownFile structure
      return mdFiles.map(file => {
        const filePath = path.join(parentDir, file);
        const stats = fs.statSync(filePath);
        
        return {
          name: file,
          path: file,
          content: fs.readFileSync(filePath, 'utf-8'),
          lastModified: formatDate(stats.mtime.toString()),
          size: formatFileSize(stats.size),
        };
      });
    } catch (error) {
      console.error('Error reading markdown files:', error);
      // Fall back to static data if there's an error
      return staticMarkdownFiles;
    }
  }
  
  // In static build, use the static data
  return staticMarkdownFiles;
}

export function getMarkdownFileByName(fileName: string): MarkdownFile | null {
  // In development/server mode, read actual file
  if (isServerSide) {
    try {
      const filePath = path.join(getParentDir(), fileName);
      
      if (!fs.existsSync(filePath)) {
        return null;
      }
      
      const stats = fs.statSync(filePath);
      
      return {
        name: fileName,
        path: fileName,
        content: fs.readFileSync(filePath, 'utf-8'),
        lastModified: formatDate(stats.mtime.toString()),
        size: formatFileSize(stats.size),
      };
    } catch (error) {
      console.error(`Error reading markdown file ${fileName}:`, error);
      // Fall back to static data if there's an error
      const file = staticMarkdownFiles.find(file => file.path === fileName);
      return file || null;
    }
  }
  
  // In static build, look up in the static data
  const file = staticMarkdownFiles.find(file => file.path === fileName);
  return file || null;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
} 