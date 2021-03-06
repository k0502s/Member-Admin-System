import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Collapse from '@material-ui/core/Collapse';
import { BsFillTrashFill, BsChevronDown, BsChevronUp, BsReply } from 'react-icons/bs';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { CardBody, CardHeader } from 'reactstrap';
import { MEMBER_REMOVEWARNMEMBER_REQUEST, MEMBER_DELETE_REQUEST } from '../../../../redux/types';
import * as S from '../WarnMemberListPage.style';

type State = {
    auth: {
        warnlistDetail: { name: string; _id: string; images: string; sex: number; map: any; length: number; };
    };
};

type WarnMemberDatatype = {
    name: string;
    _id: string;
    sex: number;
    age: number;
    camera: string;
    images: string;
    quantity: number;
};

type Sextype = {
    1: string;
    2: string;
    [key: number]: string;
}

const sex: Sextype = {
    1: '남',
    2: '여',
};

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(10),
    },
}));

const WarnCardBlock = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ShowEmpty, setShowEmpty] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<React.Key | number>(0);
    const [open, setOpen] = React.useState(false);
    const { warnlistDetail } = useSelector((state: State) => state.auth);

    const handleClick = (index: React.Key) => {
        setSelectedIndex(index);
        setOpen(!open);
    };

    const renderCartImage = (images: string) => {
        if (images.length > 0) {
            let image = images[0];
            return `${image}`;
        }
    };

    useEffect(() => {
        if (warnlistDetail.length <= 0 || undefined) {
            setShowEmpty(false);
        } else {
            setShowEmpty(true);
        }
    }, [warnlistDetail]);

    let deleteFromlist = (id: string) => {
        const body = {
            token: localStorage.getItem('token'),
            id: id,
        };
        if (window.confirm('해당 회원의 경고를 해제하시겠습니까?')) {
            dispatch({
                type: MEMBER_REMOVEWARNMEMBER_REQUEST,
                payload: body,
            });
            alert('해제 완료.');
        } else {
            alert('취소 완료.');
        }
    };

    const deleteMemberData = (id: string) => {
        const body = {
            token: localStorage.getItem('token'),
            id: id,
        };
        if (window.confirm('해당 회원을 제명하시겠습니까?')) {
            dispatch({
                type: MEMBER_DELETE_REQUEST,
                payload: id,
            });
            dispatch({
                type: MEMBER_REMOVEWARNMEMBER_REQUEST,
                payload: body,
            });
            alert('제명 완료.');
        } else {
            alert('취소 완료.');
        }
    };

    const renderItems = () =>
        warnlistDetail &&
        warnlistDetail.map((warnlist: WarnMemberDatatype, index: React.Key) => (
            <S.WarnList onClick={() => handleClick(index)} key={index} data-testid="warn-drop">
                <S.WarnListItem button>
                    <ListItemAvatar>
                        <Avatar>
                            <S.Img src={renderCartImage(warnlist.images)} data-testid="warn-image" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="이름" secondary={warnlist.name} data-testid="warn-name" />
                    <ListItemText primary="성별" secondary={sex[warnlist.sex]} data-testid="warn-sex" />
                    <ListItemText primary="나이" secondary={warnlist.age} data-testid="warn-age" />
                    <ListItemText primary="경고" secondary={warnlist.quantity} data-testid="warn-quantity" />
                    {open ? <BsChevronUp /> : <BsChevronDown />}
                </S.WarnListItem>
                <Divider variant="inset" />
                <Collapse in={selectedIndex === index && open} timeout="auto" unmountOnExit>
                    <S.WarnList disablePadding>
                        <ListItem button className={classes.nested} onClick={() => deleteFromlist(warnlist._id)} data-testid="warn-button-1">
                            <ListItemIcon>
                                <BsReply />
                            </ListItemIcon>
                            <ListItemText primary="경고 해제" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={() => deleteMemberData(warnlist._id)} data-testid="warn-button-2">
                            <ListItemIcon>
                                <BsFillTrashFill />
                            </ListItemIcon>
                            <ListItemText primary="영구 제명" />
                        </ListItem>
                    </S.WarnList>
                </Collapse>
            </S.WarnList>
        ));

    return (
        <>
            {ShowEmpty ? (
                <S.WarnCard>
                    <CardHeader>
                        <strong>경고 회원 리스트</strong>
                    </CardHeader>
                    <CardBody>{renderItems()}</CardBody>
                </S.WarnCard>
            ) : (
                <>
                    <S.EmptyIcon />
                    <S.Emptytext>Empty</S.Emptytext>
                </>
            )}
        </>
    );
};

export default WarnCardBlock;
