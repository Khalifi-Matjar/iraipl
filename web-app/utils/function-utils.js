export const formatMoney = (amount) =>
    amount.toLocaleString('ID', {
        style: 'currency',
        currency: 'IDR',
    });

export const formatDate = (theDate) => {
    const date = new Date(theDate);
    const dateTimeFormatter = new Intl.DateTimeFormat('ID', {
        dateStyle: 'long',
    });
    return dateTimeFormatter.format(date);
};
