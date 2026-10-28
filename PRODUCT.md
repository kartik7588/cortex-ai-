# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

CortexAI is for people doing sustained knowledge and production work with AI: reasoning through questions, researching current information, writing or debugging code, understanding uploaded documents and images, and producing files such as presentations, PDFs, images, and small web projects.

## Product Purpose

CortexAI provides one persistent conversational workspace for choosing or automatically routing work to specialized AI agents. Success means a user can move from a request and source material to an answer or usable artifact without leaving the conversation context.

## Positioning

The product combines routed specialist agents, persistent conversation memory, file-aware analysis, generated downloadable outputs, and an integrated code-and-preview workspace within one conversation interface.

## Operating Context

Users return to saved conversations, enter prompts, optionally upload a PDF or image, choose an agent or use automatic routing, review Markdown responses, inspect generated images, and open generated code artifacts in a Monaco editor or live HTML preview. They manage a metered credit balance and can upgrade through Razorpay.

## Capabilities and Constraints

- Google authentication through Firebase, backed by a server session.
- Persistent conversations and messages stored through the chat service.
- Automatic routing or explicit selection among Chat, Search, Coding, PDF, PPT, and Vision agents.
- Uploaded PDFs route to document retrieval and question answering; uploaded images route to image analysis.
- Generated projects are represented as files and inspected through Monaco with an HTML preview when `index.html` is available.
- PDF, presentation, and image agents return generated files or images through the existing backend contracts.
- Agent use is rate-limited and consumes plan credits.
- Plans are Free, Starter, and Pro; paid checkout uses Razorpay in INR.
- The frontend must remain React 19, Vite, Tailwind CSS 4, Redux Toolkit, Lucide, Motion, Monaco, React Markdown, and Firebase.
- Existing API calls, Redux actions, routing, upload behavior, payment flow, and backend contracts must remain intact.

## Brand Commitments

- Product name: CortexAI.
- The interface is an operational creative and technical workspace, not a marketing surface.
- Voice is concise, capable, calm, and factual.
- Product identity must not rely on indigo/violet gradients, decorative glow, generic AI imagery, or unsupported claims.

## Evidence on Hand

- The working frontend is under `frontend/src`.
- Backend agent routing and capabilities are implemented under `backend/services/agent`.
- Authentication, billing, conversation persistence, credit costs, and rate limits are implemented in the backend services.
- No testimonials, customer counts, certifications, or other marketing proof are present and none should be fabricated.

## Product Principles

- Keep the conversation as the durable center of work.
- Make specialist capability visible without making the interface feel like a control panel.
- Let generated outputs remain inspectable and usable beside the conversation.
- Prefer legibility, state clarity, and continuity over novelty.
- Preserve user trust by exposing loading, failure, disabled, and payment states clearly.

## Accessibility & Inclusion

Target WCAG AA where practical, including visible keyboard focus, semantic dialogs and controls, accessible names for icon-only actions, keyboard dismissal and focus return for overlays, reduced-motion support, and layouts usable from 360px mobile widths through wide desktop screens.
