import { Request, Response, NextFunction } from 'express';

/**
 * Company context attached to each request
 */
export interface CompanyContext {
  companyId: string;
  domain: string;
}

/**
 * Extend Express Request to include company context
 */
declare global {
  namespace Express {
    interface Request {
      companyContext?: CompanyContext;
    }
  }
}

/**
 * Map of domain to company database name
 * Configure this based on your deployment
 * Example:
 * - api.best-chauffeurs.com → best-chauffeurs
 * - api.hopelimo.com → hopelimo
 */
const DOMAIN_TO_COMPANY_MAP: Record<string, string> = {
  'api.best-chauffeurs.com': 'best_chauffeurs',
  'best-chauffeurs.com': 'best_chauffeurs',
  'www.best-chauffeurs.com': 'best_chauffeurs',
  'adminaccess.best-chauffeurs.com': 'best_chauffeurs',
  
  // Add more companies as needed
  'api.hopelimo.com': 'hopelimo',
  'hopelimo.com': 'hopelimo',
  'www.hopelimo.com': 'hopelimo',
  'adminaccess.hopelimo.com': 'hopelimo',
  
  // Fallback for localhost/testing
  'localhost': 'best_chauffeurs',
  'api.localhost': 'best_chauffeurs',
};

/**
 * Extract company ID from request (hostname/domain)
 * Supports environment variable override for testing
 */
export function extractCompanyFromRequest(req: Request): CompanyContext {
  // Allow override via query parameter (for testing)
  if (req.query.company) {
    return {
      companyId: String(req.query.company),
      domain: req.hostname,
    };
  }

  // Allow override via header (for internal services)
  if (req.headers['x-company-id']) {
    return {
      companyId: String(req.headers['x-company-id']),
      domain: req.hostname,
    };
  }

  // Extract company from hostname
  const hostname = req.hostname;
  const companyId = DOMAIN_TO_COMPANY_MAP[hostname];

  if (!companyId) {
    console.warn(`Unknown domain: ${hostname}, defaulting to best_chauffeurs`);
    return {
      companyId: 'best_chauffeurs',
      domain: hostname,
    };
  }

  return {
    companyId,
    domain: hostname,
  };
}

/**
 * Middleware to attach company context to request
 * Must be called early in the middleware chain
 */
export function companyContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.companyContext = extractCompanyFromRequest(req);
    next();
  } catch (error) {
    console.error('Error extracting company context:', error);
    res.status(400).json({ error: 'Invalid company context' });
  }
}

/**
 * Verify that company context is set
 * Use as middleware before routes that require company context
 */
export function requireCompanyContext(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.companyContext) {
    return res.status(400).json({ error: 'Company context not found' });
  }
  next();
}
