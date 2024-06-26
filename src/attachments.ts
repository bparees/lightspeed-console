import { Map as ImmutableMap } from 'immutable';

import { Attachment } from './types';

export enum AttachmentTypes {
  Events = 'Events',
  Log = 'Log',
  YAML = 'YAML',
  YAMLStatus = 'YAML Status',
}

export const buildQuery = (
  query: string,
  attachments: ImmutableMap<string, Attachment>,
): string => {
  let fullQuery = query;

  attachments.forEach((attachment: Attachment) => {
    const { attachmentType, kind, name, options, value } = attachment;

    if (attachmentType === AttachmentTypes.YAML) {
      fullQuery += `

For reference, here is the full resource YAML for ${kind} '${name}':
\`\`\`yaml
${value}
\`\`\``;
    }

    if (attachmentType === AttachmentTypes.YAMLStatus) {
      fullQuery += `

For reference, here is the resource's 'status' section YAML for ${kind} '${name}':
\`\`\`yaml
${value}
\`\`\``;
    }

    if (attachmentType === AttachmentTypes.Events) {
      fullQuery += `

For reference, here are the most recent ${options?.lines} events for ${kind} '${name}':
\`\`\`
${value}
\`\`\``;
    }

    if (attachmentType === AttachmentTypes.Log) {
      fullQuery += `

For reference, here are the most recent ${options?.lines} lines from the log for ${kind} '${name}':
\`\`\`
${value}
\`\`\``;
    }
  });

  return fullQuery;
};
