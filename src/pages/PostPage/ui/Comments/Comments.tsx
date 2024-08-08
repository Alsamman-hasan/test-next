
import { usePostComments } from '../../model/service/fetchComment/fetchComment';
import { VStack } from '@/shared/ui/Stack';
import { PTag } from '@/shared/ui/Paragraph/P';
import { Loader } from '@/shared/ui/Loader/LoaderUi';
import { Htag } from '@/shared/ui/Htage/Htage';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export interface CommentsProps {
  id?:string;
}

export const Comments = (props: CommentsProps) => {
  const { id } = props;
  const { data, isPending, isError } = usePostComments(id)

  if (isPending) return <Loader />;
  if (isError) return <div>Sorry There was an Error</div>;

  return (
    <VStack gap={3} max >
      <Htag tage='h2'> комментарии </Htag>
      <VStack gap={2} max >
        {data.map(({id, body, email, name}) => (
          <ListItem key={id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={<PTag tage='P1' >{name}</PTag>}
              secondary={
                <>
                  <PTag tage='P1' >{email}</PTag>
                  <PTag tage='P2' >{body}</PTag>
                </>
              }
            />
          </ListItem>
        ))}
      </VStack>
    </VStack>
  );
};
