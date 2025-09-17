import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AssignmentSubmissionFormProps {
  onClose: () => void;
}

export function AssignmentSubmissionForm({ onClose }: AssignmentSubmissionFormProps) {
  const [formData, setFormData] = useState({
    course: '',
    assignment: '',
    description: '',
    files: [] as File[]
  });

  const courses = [
    { id: '1', name: 'Mathematics 101' },
    { id: '2', name: 'Physics Lab' },
    { id: '3', name: 'Computer Science' },
    { id: '4', name: 'English Literature' }
  ];

  const assignments = {
    '1': ['Problem Set 5', 'Midterm Project', 'Final Exam'],
    '2': ['Lab Report 3', 'Experiment Analysis', 'Group Project'],
    '3': ['Programming Assignment 2', 'Database Design', 'Web App Project'],
    '4': ['Essay on Shakespeare', 'Literary Analysis', 'Research Paper']
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files].slice(0, 5) // Max 5 files
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.course || !formData.assignment) {
      toast({
        title: "Missing Information",
        description: "Please select a course and assignment.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been submitted successfully!",
    });
    
    onClose();
  };

  return (
    <Card className="glass-card max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-student-primary" />
            Submit Assignment
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select value={formData.course} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, course: value, assignment: '' }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.course && (
            <div className="space-y-2">
              <Label htmlFor="assignment">Assignment</Label>
              <Select value={formData.assignment} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, assignment: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select an assignment" />
                </SelectTrigger>
                <SelectContent>
                  {assignments[formData.course as keyof typeof assignments]?.map(assignment => (
                    <SelectItem key={assignment} value={assignment}>
                      {assignment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any notes or comments about your submission..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Files</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt,.zip,.jpg,.png"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, TXT, ZIP, JPG, PNG (Max 5 files)
                </p>
              </label>
            </div>
          </div>

          {formData.files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files</Label>
              <div className="space-y-2">
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-student">
              Submit Assignment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}