abstract class GeneralHelper {
  static convertDateToYYYYMMDD(dateString: string | undefined): string {
    if (!dateString) return "";
    const d = new Date(dateString);
    const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
    const day = d.getDay() < 10 ? `0${d.getDay()}` : d.getDay();

    return `${d.getFullYear()}-${month}-${day}`;
  }
}

export default GeneralHelper;
