'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FileUploadProps {
  type: 'claim-document' | 'practitioner-photo';
  resourceId: string;
  onUploadComplete?: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  buttonText?: string;
  className?: string;
}

export default function FileUpload({
  type,
  resourceId,
  onUploadComplete,
  accept = 'image/jpeg,image/jpg,image/png,image/webp,application/pdf,.doc,.docx',
  maxSize = 10,
  buttonText = 'Upload File',
  className = '',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setSuccess('');

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`File is too large. Maximum size is ${maxSize}MB`);
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', type);
      formData.append('resourceId', resourceId);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setSuccess('File uploaded successfully!');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      if (onUploadComplete) {
        onUploadComplete(data.url);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          disabled={uploading}
        >
          {selectedFile ? 'Change File' : buttonText}
        </Button>
        {selectedFile && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
            </span>
            <Button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              size="sm"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription className="text-green-600">{success}</AlertDescription>
        </Alert>
      )}

      <div className="text-xs text-gray-500">
        <p>Accepted formats: JPG, PNG, WEBP, PDF, DOC, DOCX</p>
        <p>Maximum file size: {maxSize}MB</p>
      </div>
    </div>
  );
}
