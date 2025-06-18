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
import { paymentType } from '../../../utils/constants';
import { listData as listIuranData } from '../master-iuran/master-iuran-functions';
import { listData as listKolektorData } from '../kolektor/kolektor-functions';

const REPORT_URL = `${location.origin}/report/penerimaan-iuran/rincian-penerimaan-iuran`;

const StyledIframe = styled('iframe')(() => ({
    width: '100%',
    height: 'calc(100dvh - 300px)',
    border: 'solid 1px #ccc',
}));

export const LaporanRincianPenerimaan = () => {
    const [jenisIuran, setJenisIuran] = useState([]);
    const [kolektor, setKolektor] = useState([]);

    useEffect(() => {
        listIuranData((iuran) => {
            setJenisIuran(iuran);
            listKolektorData((kolektor) => {
                setKolektor(kolektor);
            });
        });
    }, []);

    const searchFormDef = useMemo(
        () => [
            {
                name: 'from',
                id: 'from',
                label: 'dari',
                gridColumn: 3,
                gridColumnSmall: 6,
                type: 'date',
            },
            {
                name: 'to',
                id: 'to',
                label: 'sampai',
                gridColumn: 3,
                gridColumnSmall: 6,
                type: 'date',
            },
            {
                name: 'paymentType',
                id: 'paymentType',
                label: 'Tipe pembayaran',
                gridColumn: 6,
                options: paymentType.map((paymentType) => ({
                    label: paymentType,
                    value: paymentType,
                })),
                optionsFieldType: 'radio',
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
            {
                name: 'kolektorId',
                id: 'kolektorId',
                label: 'Kolektor',
                gridColumn: 6,
                options: kolektor.map(({ id, name }) => ({
                    label: name,
                    value: id,
                })),
            },
            {
                name: 'reportType',
                id: 'reportType',
                label: 'Tipe Laporan',
                gridColumn: 6,
                options: [
                    {
                        label: 'Lengkap dengan alamat',
                        value: '1',
                    },
                    {
                        label: 'Tanpa alamat',
                        value: '2',
                    },
                ],
                optionsFieldType: 'radio',
                validationSchema: Yup.string().required(
                    'Tentukan tipe laporan'
                ),
            },
        ],
        [jenisIuran, kolektor]
    );

    const [searchFormValue] = useState({
        from: formatDate(new Date(), dateFormat.SYSTEM),
        to: formatDate(new Date(), dateFormat.SYSTEM),
    });

    const reportIframe = useRef(null);

    const searchFormSubmitDef = useMemo(
        () => ({
            label: 'Lihat laporan',
            onSubmit: ({
                from,
                to,
                paymentType,
                iuranId,
                kolektorId,
                reportType,
            }) => {
                const url = new URL(REPORT_URL);
                url.search = new URLSearchParams({
                    from,
                    to,
                    paymentType,
                    iuranId,
                    kolektorId,
                    reportType,
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
