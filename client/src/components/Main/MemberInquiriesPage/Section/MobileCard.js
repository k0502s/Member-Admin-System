import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { BsFillTrashFill, BsChevronDown, BsChevronUp, BsQuestionCircle, BsQuestionDiamond } from 'react-icons/bs';
import * as S from '../MemberInquiriesPage.style';

const MobileCard = ({ removeFromInquiries }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = React.useState(false);
    const { inquiriesdata } = useSelector((state) => state.member);

    const handleClick = (index) => {
        setSelectedIndex(index);
        setOpen(!open);
    };

    return (
        <>
            {inquiriesdata &&
                inquiriesdata.map((inquiries, index) => (
                    <S.list onClick={() => handleClick(index)} key={index}>
                        <ListItem >
                            <ListItemAvatar>
                                <Avatar>
                                <strong>?</strong>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`회원 이름: ${inquiries.name}`} secondary={`연락 이메일: ${inquiries.email}`} />
                            {open ? <BsChevronUp /> : <BsChevronDown />}
                        </ListItem>
                        <Divider variant="inset" />
                        <Collapse in={selectedIndex === index && open} timeout="auto" unmountOnExit>
                            <S.list >
                                <ListItem button>
                                    <ListItemIcon>
                                        <BsQuestionDiamond />
                                    </ListItemIcon>
                                    <ListItemText
                                        secondary={
                                            <>
                                                <div>문의 사항 :</div>
                                                {inquiries.opinion}
                                            </>
                                        }
                                    />
                                </ListItem>
                                <ListItem button onClick={() => removeFromInquiries(inquiries._id)}>
                                    <ListItemIcon>
                                        <BsFillTrashFill />
                                    </ListItemIcon>
                                    <ListItemText primary="삭제" />
                                </ListItem>
                            </S.list>
                        </Collapse>
                    </S.list>
                ))}
        </>
    );
};

export default MobileCard;