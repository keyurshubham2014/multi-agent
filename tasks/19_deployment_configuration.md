# Task 19: Deployment Configuration (Post-MVP)

## Phase
Deployment

## Objective
Configure deployment infrastructure for the AgentForge platform and implement the Cloud Run deployment feature for user pipelines.

## Description
Set up production deployment for the Next.js frontend on Vercel and the FastAPI backend on Google Cloud Run. Configure environment variables, secrets management, and domain settings. Implement the pipeline deployment feature allowing users to export their pipelines as Cloud Run services. Create deployment configuration UI and automated deployment workflows.

## Sub Tasks

### 19.1 Configure Vercel Deployment for Frontend
Set up Vercel project for the Next.js frontend with production environment configuration. Configure environment variables for production API endpoints and Supabase credentials. Set up preview deployments for pull requests.

**Status:** Pending

### 19.2 Configure Cloud Run Deployment for Backend
Set up Google Cloud Run deployment for the FastAPI ADK service. Configure container builds with Cloud Build. Set up environment variables and secrets management using Secret Manager.

**Status:** Pending

### 19.3 Implement Domain and SSL Configuration
Configure custom domain settings for production deployment. Set up SSL certificates for secure connections. Document DNS configuration requirements for custom domains.

**Status:** Pending

### 19.4 Build Pipeline Export to Cloud Run Feature
Create the pipeline export functionality that generates deployable Cloud Run service configurations from user pipelines. Build the deployment wizard UI for configuring environment variables and API keys for deployed pipelines.

**Status:** Pending

### 19.5 Create Deployment Monitoring and Rollback
Implement deployment status tracking to monitor pipeline deployment progress. Create rollback functionality for failed deployments. Generate API documentation for deployed pipeline endpoints.

**Status:** Pending

## Acceptance Criteria
- Vercel deployment configured for frontend
- Cloud Run deployment configured for FastAPI backend
- Environment variables and secrets properly managed
- Custom domain configuration documented
- Pipeline export to Cloud Run implemented
- Deployment configuration UI created
- Environment variable input for deployed pipelines
- Deployment status tracking
- API endpoint URL generation for deployed pipelines
- Deployment documentation generated automatically
- Rollback procedures documented

## Dependencies
- Task 18: Testing and Quality Assurance

## Estimated Effort
7-10 days

## Note
This task is marked as post-MVP but included for planning completeness. Core platform deployment (Vercel/Cloud Run hosting) is required; pipeline-to-Cloud-Run export may be deferred.
