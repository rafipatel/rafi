import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LinkedInPoster() {
  const [name, setName] = useState('');
  const [jobPost, setJobPost] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !jobPost.trim()) {
      setStatus('error:Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('https://api.linkedin.com/rest/posts', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer AQWR_BNPrnvEhWs-ZzQ-NVBMSoLSKH1hBNu5g6raepNzc4yqsIiqa0Rmeap7HHcwoxIZAXYZJewjkVf0zEoh_JFH03kNpPg0dBuvnxuy39qzoipLZp-k-5488r1w9aXsp4a_6HJtvKT3597DyMVEgnMMoxe9DlD_RSTdAQv3Q7N0jWf5x_UTZouXX0JX6xSjtYko6ayndBaviyvFC1kAzEwVi5vBgRrrCXPHSrS6JDupAFLobTj_LyY2IN3E4-5dGQFZeD6LG4jMOFMM2fQnIKDGn4lx4038qqh35Q12O85Crp_MOXr1qnbCem5QEReIrleOYZWpoGOZCr8pb3bq36t_-JGcmw',
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': '202510'
        },
        body: JSON.stringify({
          author: 'urn:li:organization:109178896',
          commentary: `${name}\n\n${jobPost}`,
          visibility: 'PUBLIC',
          lifecycleState: 'PUBLISHED',
          distribution: {
            feedDistribution: 'MAIN_FEED',
            targetEntities: [],
            thirdPartyDistributionChannels: []
          },
          isReshareDisabledByAuthor: false
        })
      });

      if (response.ok) {
        setStatus('success:Post published successfully!');
        setName('');
        setJobPost('');
      } else {
        const errorText = await response.text();
        setStatus(`error:Error ${response.status} - ${errorText}`);
      }
    } catch (error: any) {
      setStatus(`error:${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isError = status.startsWith('error:');
  const statusMessage = status.split(':')[1] || status;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>LinkedIn Job Poster</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobPost">Job Post</Label>
            <Textarea
              id="jobPost"
              value={jobPost}
              onChange={(e) => setJobPost(e.target.value)}
              rows={8}
              placeholder="Enter job post details"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>

          {status && (
            <Alert variant={isError ? 'destructive' : 'default'}>
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}