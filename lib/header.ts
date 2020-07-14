export default class Header {
  public checksum?: number;
  public fileMagic?: String;
  public cibChecksum?: string;
  public maskedLowCheckSums?: string;
  public maskedHighCheckSums?: string;
  public version?: string;
  public reserved1C?: string;
  public scrambledChecksum?: string;
  public reserved20?: string;
  public width?: number;
  public height?: number;
  public scrambled?: string;
  public numberOfClues?: string;
  public unknownBitmask?: string;
  public scambledtag?: string;
  public title?: string;
  public author?: string;
  public copyright?: string;

}
