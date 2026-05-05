
export type RequestStatus = 'PENDING' | 'GRANTED' | 'REVOKED' | 'REJECTED';

export interface AccessRequest {
  id: string;
  userEmail: string;
  userName: string;
  documentName: string;
  status: RequestStatus;
  requestDate: string;
  processedDate?: string;
}

export interface AdminStats {
  total: number;
  pending: number;
  granted: number;
  revoked: number;
}
