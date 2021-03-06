import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Loader } from '../../Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { BsArrowRepeat } from 'react-icons/bs';
import Contact from './Section/Contact';
import MobileCard from './Section/MobileCard';
import { CardText, Row, Col, CardHeader, CardBody } from 'reactstrap';
import { MEMBER_INQUIRIES_REQUEST, MEMBER_REMOVE_INQUIRIES_REQUEST, CLEAR_ERROR_REQUEST, CLEAR_ERROR_REQUEST_1 } from '../../../redux/types';
import * as S from './MemberInquiriesPage.style';

type State = {
    member: {
        inquiriesdata: { _id: string; name: string; email: string; opinion: string; map: any };
        totalPages: number;
        isLoading: boolean;
    };
};
type Inquiriestype = {
    _id: string;
    name: string;
    email: string;
    opinion: string;
};

const MemberInquiries = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number | string>(5);
    const pageSizes = [5, 10];
    const { inquiriesdata, totalPages, isLoading } = useSelector((state: State) => state.member);

    const getRequestParams = (page: number, pageSize: number | string) => {
        let params: any = {};

        if (page) {
            params.page = page - 1;
        }

        if (pageSize) {
            params.size = pageSize;
        }

        return params;
    };

    const retrieve = () => {
        const params = getRequestParams(page, pageSize);

        dispatch({
            type: MEMBER_INQUIRIES_REQUEST,
            payload: { params },
        });
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        });
        dispatch({
            type: CLEAR_ERROR_REQUEST_1,
        });
    };

    useEffect(retrieve, [page, pageSize]);

    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(e.target.value);
        setPage(1);
    };

    let removeFromInquiries = (id: string) => {
        dispatch({
            type: MEMBER_REMOVE_INQUIRIES_REQUEST,
            payload: id,
        });
        retrieve();
    };

    const retrieveDB = () => {
        retrieve();
    };

    const Body = (
        <>
            <S.Title>
                <h1>MEMBER INQUIRIES LIST</h1>
            </S.Title>
            <hr />
            <Row>
                <Helmet title={`?????? ?????? ?????????`} />
                <Col md={7} sm={12}>
                    <S.QCard radius={'5px'}>
                        <CardHeader>
                            <Row>
                                <Col>
                                    <strong>?????? ?????? ?????????</strong>
                                </Col>
                                <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <S.Qbtn onClick={retrieveDB}>
                                        <BsArrowRepeat id="icon" />
                                    </S.Qbtn>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <S.QTable size="sm">
                                <thead>
                                    <tr>
                                        <S.Th>?????? ??????</S.Th>
                                        <S.Th>?????? ?????????</S.Th>
                                        <S.Th>?????? ??????</S.Th>
                                        <S.Th>??????</S.Th>
                                    </tr>
                                </thead>
                                {inquiriesdata &&
                                    inquiriesdata.map((inquiries: Inquiriestype, index: React.Key) => (
                                        <tbody key={index}>
                                            <tr>
                                                <S.Th width={'10%'} data-testid="inquiries-name">
                                                    {inquiries.name}
                                                </S.Th>
                                                <S.Th width={'15%'} data-testid="inquiries-email">
                                                    {inquiries.email}
                                                </S.Th>
                                                <S.Th width={'25%'} data-testid="inquiries-opinion">
                                                    {inquiries.opinion}
                                                </S.Th>
                                                <S.Th width={'10%'}>
                                                    <S.DeleteIcon onClick={() => removeFromInquiries(inquiries._id)} data-testid="inquiries-button" />
                                                </S.Th>
                                            </tr>
                                        </tbody>
                                    ))}
                            </S.QTable>
                            <Col sm={12}>
                                <MobileCard removeFromInquiries={removeFromInquiries} />
                            </Col>
                        </CardBody>
                    </S.QCard>

                    <Col md={{ offset: 4 }} className="mt-3">
                        <S.Span margin={'280px'}>Page: </S.Span>
                        <select onChange={handlePageSizeChange} value={pageSize}>
                            {pageSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col>
                        <Pagination variant="outlined" count={totalPages} page={page} siblingCount={1} boundaryCount={1} shape="rounded" onChange={handlePageChange} />
                    </Col>
                </Col>
                <Col md={5} sm={12}>
                    <S.QCard>
                        <CardHeader>
                            <strong>????????? ??????</strong>
                        </CardHeader>
                        <S.QCard body>
                            <CardText>??? ?????? ?????? ?????? ?????? ??????</CardText>
                            <CardText>1. ??? ?????? ?????? ??????????????? ????????? ???????????? ?????? ???????????? ?????? ????????? ??????????????? ?????? ?????? ???????????? ?????? ?????????.</CardText>
                            <br />
                            <CardText>2. ?????? ????????? ?????? ?????? ?????? ????????? ?????? ????????? ?????? ?????? ?????? ???????????? ?????? ??? ????????????.</CardText>
                        </S.QCard>
                        <CardBody>
                            <Contact />
                        </CardBody>
                    </S.QCard>
                </Col>
            </Row>
        </>
    );

    return <>{isLoading ? Loader : Body}</>;
};

export default MemberInquiries;
