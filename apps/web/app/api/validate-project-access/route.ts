import { ProjectModel } from '@repo/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('id');
  const userId = req.headers.get('user-id');

  if (!projectId) {
    return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const project = await ProjectModel.findOne({
    identifier: projectId,
    $or: [
      { creatorId: userId },
      { collaborators: userId },
    ],
  });

  if (!project) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  return NextResponse.json({ success: true });
}
