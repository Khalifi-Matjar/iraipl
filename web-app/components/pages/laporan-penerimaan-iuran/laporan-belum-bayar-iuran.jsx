import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import * as Yup from 'yup';
import { FormBuilder } from '../../organisms/form-builder';
import { dateFormat, formatDate } from '../../../utils';
import { Button, Divider, styled } from '@mui/material';
import { listData as listIuranData } from '../master-iuran/master-iuran-functions';

const REPORT_URL = `${location.origin}/report/penerimaan-iuran/belum-bayar-iuran`;

const StyledIframe = styled('iframe')(() => ({
    width: '100%',
    height: 'calc(100dvh - 300px)',
    border: 'solid 1px #ccc',
}));

export const LaporanBelumBayar = () => {
    const [jenisIuran, setJenisIuran] = useState([]);

    useEffect(() => {
        listIuranData((iuran) => {
            setJenisIuran(iuran);
        });
    }, []);

    const searchFormDef = useMemo(
        () => [
            {
                name: 'period',
                id: 'period',
                label: 'Periode',
                gridColumn: 3,
                gridColumnSmall: 6,
                type: 'month',
            },
            {
                name: 'iuranId',
                id: 'iuranId',
                label: 'Nama Iuran',
                gridColumn: 6,
                options: jenisIuran.map(({ id, iuranName }) => ({
                    label: iuranName,
                    value: id,
                })),
                validationSchema: Yup.string().required('Berikan nama iuran'),
            },
        ],
        [jenisIuran]
    );

    const [searchFormValue] = useState({
        from: formatDate(new Date(), dateFormat.SYSTEM),
        to: formatDate(new Date(), dateFormat.SYSTEM),
    });

    const reportIframe = useRef(null);

    const searchFormSubmitDef = useMemo(
        () => ({
            label: 'Lihat laporan',
            onSubmit: ({ period, iuranId }) => {
                const url = new URL(REPORT_URL);
                url.search = new URLSearchParams({
                    period,
                    iuranId,
                });

                reportIframe.current.src = url;
            },
        }),
        [reportIframe.current]
    );

    const printReport = useCallback(() => {
        reportIframe.current.contentWindow.print();
    }, [reportIframe.current]);

    return (
        <div>
            <FormBuilder
                formDefinitions={searchFormDef}
                valueDefinitions={searchFormValue}
                submitDefinition={searchFormSubmitDef}
            />
            <br />
            <Divider>
                <Button variant="outlined" size="small" onClick={printReport}>
                    Klik untuk mencetak
                </Button>
            </Divider>
            <br />
            <StyledIframe ref={reportIframe} />
        </div>
    );
};
