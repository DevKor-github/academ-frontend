export default function LectureIcon({ code, kind = 'SMALL' }: { code: string; kind?: 'BIG' | 'SMALL' }) {
  (function ignore(r) {
    return r;
  })(code);

  const scale = kind === 'BIG' ? '80px' : '48px';
  const smallScale = kind === 'BIG' ? '12px' : '4px';
  const imageUrl = `url(${imageMap[code.substring(0, 3)] || '/cicon/ku.jpg'})`;

  return (
    <div
      className="flex flex-row justify-center items-center overflow-clip"
      style={{
        backgroundImage: imageUrl,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        aspectRatio: 1,
        minWidth: scale,
        minHeight: scale,
        width: scale,
        height: scale,
        maxWidth: scale,
        maxHeight: scale,
        borderRadius: scale,
        overflow: 'clip',
      }}
    >
      {/* <img
        className="absolute z-10"
        loading="eager"
        src={imageUrl}
        alt="banner image"
        width={81}
        height={105}
        style={{
          padding: smallScale,
          // borderRadius: scale,
          height: scale,
          width: scale,
          objectFit: 'contain',
        }}
      /> */}
    </div>
  );
}

const imageMap: { [key: string]: string } = {
  // Biz images
  EMB: '/cicon/biz.jpg',
  FMB: '/cicon/biz.jpg',
  KMB: '/cicon/biz.jpg',
  AMB: '/cicon/biz.jpg',
  BUS: '/cicon/biz.jpg',

  // CS images
  BRI: '/cicon/cs.jpg',
  XAI: '/cicon/cs.jpg',
  AAA: '/cicon/cs.jpg',
  DFE: '/cicon/cs.jpg',
  BDC: '/cicon/cs.jpg',
  SWS: '/cicon/cs.jpg',
  AAI: '/cicon/cs.jpg',
  CVO: '/cicon/cs.jpg',
  IGC: '/cicon/cs.jpg',
  DFC: '/cicon/cs.jpg',
  CVX: '/cicon/cs.jpg',
  CRE: '/cicon/cs.jpg',

  // Dental images
  CDT: '/cicon/dental.jpg',
  CDS: '/cicon/dental.jpg',
  CDR: '/cicon/dental.jpg',
  CDG: '/cicon/dental.jpg',
  CDI: '/cicon/dental.jpg',
  CDO: '/cicon/dental.jpg',
  CDA: '/cicon/dental.jpg',

  // Design images
  AND: '/cicon/design.jpg',

  // Education images
  GEO: '/cicon/edu.jpg',
  DCI: '/cicon/edu.jpg',
  EDU: '/cicon/edu.jpg',
  KLE: '/cicon/edu.jpg',
  ENE: '/cicon/edu.jpg',
  HEE: '/cicon/edu.jpg',
  PHE: '/cicon/edu.jpg',
  EHO: '/cicon/edu.jpg',
  ENU: '/cicon/edu.jpg',
  ESE: '/cicon/edu.jpg',
  EGN: '/cicon/edu.jpg',
  EEM: '/cicon/edu.jpg',
  EHP: '/cicon/edu.jpg',
  EEI: '/cicon/edu.jpg',
  EEA: '/cicon/edu.jpg',
  EKL: '/cicon/edu.jpg',
  ECR: '/cicon/edu.jpg',
  EET: '/cicon/edu.jpg',
  EAR: '/cicon/edu.jpg',
  ECP: '/cicon/edu.jpg',
  EBI: '/cicon/edu.jpg',
  EMA: '/cicon/edu.jpg',
  EHI: '/cicon/edu.jpg',
  EEL: '/cicon/edu.jpg',
  EGS: '/cicon/edu.jpg',
  EED: '/cicon/edu.jpg',
  ESO: '/cicon/edu.jpg',
  EJL: '/cicon/edu.jpg',
  EGE: '/cicon/edu.jpg',
  EHE: '/cicon/edu.jpg',
  ECM: '/cicon/edu.jpg',
  ELL: '/cicon/edu.jpg',
  EKF: '/cicon/edu.jpg',
  GCE: '/cicon/edu.jpg',
  SLP: '/cicon/edu.jpg',

  // Engineering images
  EGR: '/cicon/eng.jpg',
  ITB: '/cicon/eng.jpg',
  ITC: '/cicon/eng.jpg',
  ITT: '/cicon/eng.jpg',
  ITL: '/cicon/eng.jpg',
  ITK: '/cicon/eng.jpg',
  ITS: '/cicon/eng.jpg',
  ITE: '/cicon/eng.jpg',
  ITH: '/cicon/eng.jpg',
  ITI: '/cicon/eng.jpg',
  ITP: '/cicon/eng.jpg',
  ACE: '/cicon/eng.jpg',
  ITJ: '/cicon/eng.jpg',
  ARC: '/cicon/eng.jpg',
  MEC: '/cicon/eng.jpg',
  NPE: '/cicon/eng.jpg',
  LSC: '/cicon/eng.jpg',
  AMS: '/cicon/eng.jpg',
  AUT: '/cicon/eng.jpg',
  ECE: '/cicon/eng.jpg',
  IMO: '/cicon/eng.jpg',
  CBE: '/cicon/eng.jpg',
  SDS: '/cicon/eng.jpg',
  SMA: '/cicon/eng.jpg',
  BSF: '/cicon/eng.jpg',
  IME: '/cicon/eng.jpg',
  AFM: '/cicon/eng.jpg',

  // GS images
  GRS: '/cicon/gs.jpg',

  // Health Science images
  HEL: '/cicon/healthsci.jpg',
  HIL: '/cicon/healthsci.jpg',
  HBL: '/cicon/healthsci.jpg',
  PPH: '/cicon/healthsci.jpg',
  HSL: '/cicon/healthsci.jpg',
  HCS: '/cicon/healthsci.jpg',
  LHS: '/cicon/healthsci.jpg',
  BSB: '/cicon/healthsci.jpg',
  BSY: '/cicon/healthsci.jpg',
  BPB: '/cicon/healthsci.jpg',
  BPH: '/cicon/healthsci.jpg',

  // International images
  IDC: '/cicon/int.jpg',
  IAC: '/cicon/int.jpg',
  IIC: '/cicon/int.jpg',
  IPS: '/cicon/int.jpg',
  IAS: '/cicon/int.jpg',
  IKS: '/cicon/int.jpg',
  IRC: '/cicon/int.jpg',

  // KUKIST images
  KKS: '/cicon/kukist.jpg',
  KST: '/cicon/kukist.jpg',

  // Labor images
  ULE: '/cicon/labor.jpg',
  ULC: '/cicon/labor.jpg',
  ULL: '/cicon/labor.jpg',
  ULP: '/cicon/labor.jpg',
  UIR: '/cicon/labor.jpg',
  UHR: '/cicon/labor.jpg',

  // Law images
  GLF: '/cicon/law.jpg',
  GLH: '/cicon/law.jpg',
  GLM: '/cicon/law.jpg',
  GLK: '/cicon/law.jpg',
  GLI: '/cicon/law.jpg',
  GLO: '/cicon/law.jpg',
  GLB: '/cicon/law.jpg',
  GLL: '/cicon/law.jpg',
  GLC: '/cicon/law.jpg',
  //KLS: '/cicon/law.jpg',
  LAW: '/cicon/law.jpg',

  // Liberal Arts images
  KOR: '/cicon/libart.jpg',
  KSR: '/cicon/libart.jpg',
  ENG: '/cicon/libart.jpg',
  DHS: '/cicon/libart.jpg',
  GER: '/cicon/libart.jpg',
  FRA: '/cicon/libart.jpg',
  CJL: '/cicon/libart.jpg',
  RUS: '/cicon/libart.jpg',
  SPA: '/cicon/libart.jpg',
  PHL: '/cicon/libart.jpg',
  HTS: '/cicon/libart.jpg',
  LIN: '/cicon/libart.jpg',
  SOC: '/cicon/libart.jpg',
  HOK: '/cicon/libart.jpg',
  HAW: '/cicon/libart.jpg',

  // Life Science images
  NRD: '/cicon/lifesci.jpg',
  JDJ: '/cicon/lifesci.jpg',
  JDH: '/cicon/lifesci.jpg',
  JDF: '/cicon/lifesci.jpg',
  JDA: '/cicon/lifesci.jpg',
  JDI: '/cicon/lifesci.jpg',
  JDC: '/cicon/lifesci.jpg',
  JDD: '/cicon/lifesci.jpg',
  LED: '/cicon/lifesci.jpg',
  IBT: '/cicon/lifesci.jpg',
  KLS: '/cicon/lifesci.jpg',
  PBG: '/cicon/lifesci.jpg',
  PBP: '/cicon/lifesci.jpg',
  PBR: '/cicon/lifesci.jpg',
  CMB: '/cicon/lifesci.jpg',
  LMB: '/cicon/lifesci.jpg',
  LAB: '/cicon/lifesci.jpg',
  LEC: '/cicon/lifesci.jpg',
  BTN: '/cicon/lifesci.jpg',
  BIO: '/cicon/lifesci.jpg',
  MOL: '/cicon/lifesci.jpg',
  MMS: '/cicon/lifesci.jpg',
  BCH: '/cicon/lifesci.jpg',
  CEL: '/cicon/lifesci.jpg',
  LIS: '/cicon/lifesci.jpg',

  // Media images
  MAC: '/cicon/media.jpg',
  MCP: '/cicon/media.jpg',
  MCN: '/cicon/media.jpg',
  MCY: '/cicon/media.jpg',
  MCV: '/cicon/media.jpg',
  MCJ: '/cicon/media.jpg',

  // Medical images
  MEG: '/cicon/medical.jpg',
  BMS: '/cicon/medical.jpg',
  HPE: '/cicon/medical.jpg',
  MEI: '/cicon/medical.jpg',
  MGR: '/cicon/medical.jpg',
  MED: '/cicon/medical.jpg',

  // MOT images
  MOT: '/cicon/mot.jpg',

  // Nursing images
  NSG: '/cicon/nsg.jpg',

  // Public Health images
  HBA: '/cicon/ph.jpg',
  HBC: '/cicon/ph.jpg',
  HPM: '/cicon/ph.jpg',
  HST: '/cicon/ph.jpg',
  HEI: '/cicon/ph.jpg',
  HEO: '/cicon/ph.jpg',
  HGC: '/cicon/ph.jpg',

  // Pharmacy images
  // Add mappings for pharmacy.jpg if needed

  // Political Economy images
  POL: '/cicon/poliecono.jpg',
  PUB: '/cicon/poliecono.jpg',
  ECO: '/cicon/poliecono.jpg',
  STA: '/cicon/poliecono.jpg',
  PSG: '/cicon/poliecono.jpg',
  PSD: '/cicon/poliecono.jpg',
  PSA: '/cicon/poliecono.jpg',
  PSJ: '/cicon/poliecono.jpg',
  PSB: '/cicon/poliecono.jpg',
  PSF: '/cicon/poliecono.jpg',
  PSC: '/cicon/poliecono.jpg',
  PSI: '/cicon/poliecono.jpg',
  PSO: '/cicon/poliecono.jpg',
  PSH: '/cicon/poliecono.jpg',
  DAS: '/cicon/poliecono.jpg',
  PES: '/cicon/poliecono.jpg',

  // Psychology images
  PSY: '/cicon/psy.jpg',
  PSS: '/cicon/psy.jpg',

  // Science images
  MTH: '/cicon/sci.jpg',
  PHY: '/cicon/sci.jpg',
  QIS: '/cicon/sci.jpg',
  CHM: '/cicon/sci.jpg',
  EES: '/cicon/sci.jpg',

  // SCS images
  CYD: '/cicon/scs.jpg',
  IMS: '/cicon/scs.jpg',
  BLC: '/cicon/scs.jpg',
  BAS: '/cicon/scs.jpg',
  CGS: '/cicon/scs.jpg',
  SCS: '/cicon/scs.jpg',

  // KU images
  CLT: '/cicon/ku.jpg',
  SOS: '/cicon/ku.jpg',
  IGH: '/cicon/ku.jpg',
  FEN: '/cicon/ku.jpg',
  LBR: '/cicon/ku.jpg',
  UCR: '/cicon/ku.jpg',
  MNS: '/cicon/ku.jpg',
  MEE: '/cicon/ku.jpg',
  CHS: '/cicon/ku.jpg',
  MDE: '/cicon/ku.jpg',
  BMT: '/cicon/ku.jpg',
  BIT: '/cicon/ku.jpg',
  SSE: '/cicon/ku.jpg',
  HLT: '/cicon/ku.jpg',
  COL: '/cicon/ku.jpg',
  HCI: '/cicon/ku.jpg',
  BST: '/cicon/ku.jpg',
  IMA: '/cicon/ku.jpg',
  VIP: '/cicon/ku.jpg',
  ACT: '/cicon/ku.jpg',
  KLC: '/cicon/ku.jpg',
  CCD: '/cicon/ku.jpg',
  HMU: '/cicon/ku.jpg',
  CTL: '/cicon/ku.jpg',
  DKK: '/cicon/ku.jpg',
  GRA: '/cicon/ku.jpg',
  GSU: '/cicon/ku.jpg',
  IDS: '/cicon/ku.jpg',
  VEN: '/cicon/ku.jpg',
};
