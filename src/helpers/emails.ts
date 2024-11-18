import moment from 'moment';

export const filterEmailsByDate = (emails: any[], startDate: string | null, endDate: string | null) =>
    emails
        .filter((email) => {
            const formattedStartDate = startDate ? moment(new Date(startDate)).unix() : null;
            const formattedEndDate = endDate ? moment(new Date(endDate)).unix() : null;
            const emailDate = moment(email.date).unix();
            if (formattedStartDate !== null && formattedStartDate > emailDate) return false;
            if (formattedEndDate !== null && formattedEndDate < emailDate) return false;
            return true;
        })