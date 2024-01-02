export class ImageResolutionUtility {
  static getImageResolution(url: string, width: any, height: any) {
    return `https://res.cloudinary.com/votel/image/fetch/c_fill,g_auto,h_${height},w_${width}/b_auto:border,c_pad,h_${height},w_${width}/q_auto:best/${url}`;
  }
}
