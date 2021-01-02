import { DateTime } from 'luxon';

interface UseLastMonthInterface {
  lastMonthIso: string;
  lastMonthName: string;
}

const useLastMonth = (): UseLastMonthInterface => {
  const x = new Date();
  x.setDate(1);
  x.setHours(0);
  x.setMinutes(0);
  x.setSeconds(0);
  x.setMilliseconds(0);
  x.setMonth(x.getMonth() - 1);

  const lastMonthIso = DateTime.fromISO(x.toISOString()).toUTC().toString();

  const lastMonthName = DateTime.fromISO(x.toISOString()).setLocale('it')
    .monthLong;

  return { lastMonthIso, lastMonthName };
};

export default useLastMonth;
