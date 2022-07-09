import {
    Box,
    Typography,
    Card,
    CardHeader,
    Divider,
    Avatar,
    Grid,
    Button,
    CardMedia,
    CardContent
} from '@mui/material';

import { styled } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';


const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

function Groups({ role, groups }) {
    const navigate=useNavigate()


    return (
        <Card>
            <CardHeader title="Groups" />
            <Divider />
            <Box p={2}>
                <Grid container spacing={2}>
                    {groups?.map((group) =>
                        <Grid item xs={12} md={role === 1 ? 4 : 6}>
                            <Card sx={{ display: 'flex',cursor:'pointer' }} onClick={()=>navigate(`/home/community/${group.community_id}`)}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                    <CardContent>
                                    <Box display="flex" alignItems="center" pb={3}>
                                        <AvatarWrapper
                                            alt="Remy Sharp"
                                            src={group.group_image}
                                        />
                                        <Box sx={{ ml: 1.5 }}>
                                            <Typography variant="h4" noWrap gutterBottom>
                                                {group.name}
                                            </Typography>
                                            <Typography variant="subtitle2" noWrap>
                                                {group.purpose}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="subtitle2" gutterBottom>
                                        219.3k Total student . 120 Courses
                                    </Typography>
                                    </CardContent>
                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 200, backgroundSize: '100% 100%' }}
                                    image={group.cover_image}
                                    alt="Course Image"
                                />
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Card>
    );
}

export default Groups;
