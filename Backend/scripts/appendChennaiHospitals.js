const fs = require('fs');
const path = require('path');

const chennaiData = [
  {
    "Rohini ID": "8900080206809",
    "Hospital Name": "A.N.N HOSPITAL",
    "Address": "# 81-85, Annai Theresa Street, Indira Nagar , Valasaravakkam",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080457386",
    "Hospital Name": "A4 Hospital",
    "Address": "10/1, Radhakrishnan salai, Ramakrishna nagar, Valasaravakkam, Chennai. , Valasaravakkam , Tiruvallur , Tamil Nadu - 600087",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080499591",
    "Hospital Name": "AAKASH HOSPITAL (MYLAPORE)",
    "Address": "NO :3 , P.S. SIVASAMY SALAI, MYLAPORE CHENNAI , Mylapore , Chennai , Tamil Nadu - 600004",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080203105",
    "Hospital Name": "AAKASH HOSPITAL(THIRUVOTRIYUR)",
    "Address": "393/1, T.H. ROAD, THIRUVOTIYUR,chennai-600019 , Chennai , Tiruvallur , Tamil Nadu - 600119",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080494022",
    "Hospital Name": "ADAMBAKKAM SUDAR HOSPITAL",
    "Address": "No:3, Medavakkam Main Road, Adambakkam, Chennai , Adambakkam , Kanchipuram , Tamil Nadu - 600088",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201569",
    "Hospital Name": "ADITYA HOSPITAL [CHENNAI]",
    "Address": "# 7, Barnaby Road, Kilpauk, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206748",
    "Hospital Name": "AGARWAL EYE HOSPITAL",
    "Address": "NO.222, TTK ROAD, ALWARPET, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207240",
    "Hospital Name": "AMMA HOSPITAL (CHENNAI)",
    "Address": "# 1, SOWRASTRA NAGAR, 7TH STREET, Ch-94",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206564",
    "Hospital Name": "AMMAYI EYE CARE CENTRE",
    "Address": "New.80, 7th Avenue, Ashok Nagar, Chennai -83",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206397",
    "Hospital Name": "AMRIT HOSPITAL",
    "Address": "New No.310 Old No.362, Opposite Jain Temple, Mint Street, Sowcarpet chennai- tamil nadu , Flower Bazaar , Chennai , Tamil Nadu",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080387812",
    "Hospital Name": "AMRIT MEDICAL CENTRE (AMRIT MEDICARE PVT. LTD)",
    "Address": "NEW NO. 73/28, DR. ALAGAPPA ROAD, PURASAWALKAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206175",
    "Hospital Name": "ANAND HOSPITAL [THIRUVALLUR]",
    "Address": "NO.201, KAMARAJAR SALAI, MANALI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080477186",
    "Hospital Name": "ANBU HOSPITAL PVT LTD (CHENNAI)",
    "Address": "No:18/4, Sashi Nagar Main Road, Velachery, Ch-42 , Velacheri , Chennai City Corporation , Tamil Nadu",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080329447",
    "Hospital Name": "ANJAKHA HOSPITAL",
    "Address": "No 23 Medavakkam Main Road, Madipakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080353657",
    "Hospital Name": "ANNAI THERESA HOSPITAL PVT.LTD",
    "Address": "1/1173, Velachery Main Road, Medavakkam , Tambaram , Tamil Nadu - 600100",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080331181",
    "Hospital Name": "An-Noor Eye Hospital",
    "Address": "57 Vepery High Road, Vepery, Chennai, Tamil Nadu 600003",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201583",
    "Hospital Name": "APOLLO  FIRST MED HOSPITAL",
    "Address": "154, Poonamallee High Road, Kilpauk, Near Kmc Hospital , Chennai , Chennai , Tamil Nadu - 600010",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201422",
    "Hospital Name": "APOLLO CHILDREN HOSPITAL",
    "Address": "15, Shafi Mohammed Road, Thousand Lights, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204683",
    "Hospital Name": "APOLLO HOSPITAL (TONDAIRPET)",
    "Address": "D 645 & 646, Thiruvottiyur High Road, Tondiarpet, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201354",
    "Hospital Name": "APOLLO HOSPITAL [GREAMS LANE]",
    "Address": "# 21, Greams Lane off Greams Road, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080332539",
    "Hospital Name": "APOLLO MEDICAL CENTRE (Karapakkam)",
    "Address": "No.2/319, OMR, Karapakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080416628",
    "Hospital Name": "APOLLO PROTON CANCER CENTRE",
    "Address": "Plot No. 296/1B, 296/3B, 297/1A, 297/5A, 300/1B, Dr. Vikram Sarabhai Instronics Estate, Velachery to Taramani Road, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204010",
    "Hospital Name": "Apollo Speciality Hospitals (MRC Nagar - Raja Annamalai Puram)",
    "Address": "Plot No 41/42, Sathyadev Ave, MRC Nagar, Raja Annamalai Puram, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080334182",
    "Hospital Name": "APOLLO SPECIALITY HOSPITALS (PERUNGUDI)",
    "Address": "5/639, Old Mahabalipuram Rd, Kandancavadi, Perungudi, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207257",
    "Hospital Name": "APOLLO SPECIALITY HOSPITALS (VANAGRAM)",
    "Address": "64, Vanagaram to Ambattur Main Road , Chennai , Tiruvallur , Tamil Nadu - 600095",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204546",
    "Hospital Name": "Apollo Specialty Cancer Hospital",
    "Address": "No. 320, Anna Salai, Teynampet, Nandanam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080333765",
    "Hospital Name": "APOLLO WOMENS HOSPITAL CRADLE",
    "Address": "16/7, Shafee Mohammed Road, Thousand Lights, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207585",
    "Hospital Name": "APPASAMY MEDICARE CENTRE (CHENNAI)",
    "Address": "23, Friends Avenue, Vathalagundu Arumugam Nagar, Arumbakkam , Chennai , Chennai , Tamil Nadu - 600106",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080381148",
    "Hospital Name": "ARAVIND EYE HOSPITALS (CHENNAI)",
    "Address": "POONAMALLEE HIGH ROAD, NOOMBAL, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205680",
    "Hospital Name": "ASHWINI EYE CARE",
    "Address": "PLOT NO-144, DOOR NO- 94, NORTH PARK STREET, VENKATAPURAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080329379",
    "Hospital Name": "ASTRA ORTHO N SPINE CENTRE",
    "Address": "NO 9, RADHA MOHAN STREET, SANKARAN AVENUE, VELACHERY BYPASS ROAD, VELACHERY, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080346598",
    "Hospital Name": "AVINASH HOSPITALS (CHENNAI)",
    "Address": "NO.165, THIRUVIN NAGAR, 200FT RADIAL ROAD, KOVILAMBAKKAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080203839",
    "Hospital Name": "B S S hospital",
    "Address": "# 200 R.K Mutt Road, Mandaveli, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205970",
    "Hospital Name": "B.M HOSPITALS (NANGANALLUR)",
    "Address": "36, 5th Main Road, Thillai Ganga Nagar, Nanganallur , Chennai , Kanchipuram , Tamil Nadu - 600061",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204393",
    "Hospital Name": "B.R.S HOSPITAL",
    "Address": "NO 28, CATHEDRAL GARDEN ROAD, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205413",
    "Hospital Name": "BABUS MATERNITY HOSPITAL (CHENNAI)",
    "Address": "3, Doraisamy Reddy Street, West Tambaram, Tambaram , Chennai , Kanchipuram , Tamil Nadu - 600044",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080399396",
    "Hospital Name": "BE WELL HOSPITALS (AMBATTUR)",
    "Address": "A1 / 1, CTH Road, Balaji Nagar , Tirumullaivoyal , Poonamallee , Tamil Nadu - 600062",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204874",
    "Hospital Name": "Be Well Hospitals (Annanagar)",
    "Address": "106, JAWAHARLAL NEHRU SALAI, NEAR KOYAMBEDU JUNCTION, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202917",
    "Hospital Name": "BE WELL HOSPITALS (CHENNAI)",
    "Address": "NO.5A , VIJAYARAGHAVA ROAD , T.NAGAR , CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205888",
    "Hospital Name": "BE WELL HOSPITALS (POONAMALLEE)",
    "Address": "186 , TRUNK ROAD, POONAMALLEE, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202016",
    "Hospital Name": "BE WELL HOSPITALS PVT LTD (KILPAUK)",
    "Address": "NEW NO 15, OLD NO 8, BANK STREET, KILPAUK CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201361",
    "Hospital Name": "BHARATH HOSPITAL (CHENNAI)",
    "Address": "72, 1ST MAIN ROAD, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080338494",
    "Hospital Name": "BHARATHI RAJAA HOSPITAL and RESEARCH CENTRE PRIVATE LIMITED (CHENNAI)",
    "Address": "NO: 20 G. N CHETTY ROAD, T. NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204003",
    "Hospital Name": "BILLROTH HOSPITAL (RA PURAM)",
    "Address": "52, 2ND MAIN ROAD, RAJAANNAMALAIPURAM, RA PURAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204072",
    "Hospital Name": "BILLROTH HOSPITAL (SHENOY NAGAR)",
    "Address": "#43, LAKSHMI TAKIES RD, SHENOY NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201057",
    "Hospital Name": "C S I  Kalyani General Hospital",
    "Address": "15, Dr. Radhakrishnan Salai, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080405318",
    "Hospital Name": "C-DOT Hospital",
    "Address": "2/1029, PERUMBAKKAM MAIN ROAD, PERUMBAKKAM, CHENNAI - 600100",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080325654",
    "Hospital Name": "CENTRE FOR EYE and HEALTH CARE PVT LTD",
    "Address": "3rd Floor Ramaniyam Isha 11 Rajiv Gandhi Salai Thoraipakkam , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080488878",
    "Hospital Name": "CFC MULTISPECIALITY HOSPITAL",
    "Address": "No . 75-79 , Nelson Nelson Manickam Road , Aminijikarai . Chennai - 600029",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080459519",
    "Hospital Name": "CHENNAI HEALTH FOUNDATION (THIRUVALLUR)",
    "Address": "No.2B2, AISHWARYA NAGAR, MTH RD, THIRUMULLAIVOYAL, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205222",
    "Hospital Name": "CHENNAI KRISHNA HOSPITAL",
    "Address": "#297, GST Road, Chromepet, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201040",
    "Hospital Name": "CHENNAI MEENAKSHI  MULTISPECIALITY HOSPITAL",
    "Address": "72 / 148 Luz Church Road, Mylapore, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080200760",
    "Hospital Name": "CHENNAI NATIONAL HOSPITAL",
    "Address": "#12, Jaffer Serang Street, Lind Line Beach Road, Parrys , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206700",
    "Hospital Name": "CHENNAI NOBLE HOSPITALS PRIVATE LIMITED",
    "Address": "4, Audiappa Street, Alagappa Road, Opposite Lady, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080338487",
    "Hospital Name": "CHENNAI ORTHOPAEDIC CENTER",
    "Address": "NO 12 RAMAKRISHNA NAGAR EXTN, DR RADHAKRISHNAN SALAI, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080412019",
    "Hospital Name": "CHENNAI UROLOGY AND ROBOTICS INSTITUTE",
    "Address": "No.148, Okkiyam Thoraipakkam, OMR, Chennai-600096",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080336513",
    "Hospital Name": "CHERISH HOSPITAL",
    "Address": "12, Cholambedu Road, Thirumullaivoyal , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080208131",
    "Hospital Name": "CHETTINAD HOSPITAL and RESEARCH INSTITUTE",
    "Address": "# Chettinad Health City, Rajiv Gandhi Salai, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205918",
    "Hospital Name": "CHRISTUDAS ORTHOPAEDIC SPECIALITY HOSPITAL [CHENNAI]",
    "Address": "9, T.A.F. ROAD, DURAISWAMY NAGAR, EAST TAMBARAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080336308",
    "Hospital Name": "DARSHAN SURGICAL CENTRE (Anna Nagar)",
    "Address": "# 24, 5th Main Road, Anna Nagar, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080304819",
    "Hospital Name": "Das Nursing Home",
    "Address": "#5/271, Prem Nagar Extension Pozhichalur Main Road, Pozhichalur, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201644",
    "Hospital Name": "DEEPAM EYE HOSPITAL",
    "Address": "NO.66, MEDAVAKKAM TANK ROAD, KILPAUK, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205437",
    "Hospital Name": "DEEPAM HOSPITAL(CHENNAI)",
    "Address": "NO 327 MUTHURANGAM ROAD , WEST TAMBARAM CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207424",
    "Hospital Name": "Dhanvantari Eye Care",
    "Address": "W-27, Old No.18, North Main Road Anna Nagar West Extension, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204263",
    "Hospital Name": "DR A. RAMACHANDRA'S DIABETES HOSPITAL",
    "Address": "110, ANNA SALAI, GUINDY, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080236448",
    "Hospital Name": "DR. AGARWALS EYE HOSPITAL (MOGAPPAIR)",
    "Address": "RAAJI Tower, Plot No.105, 106, Nolambur Main Road, Mogappair West, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207486",
    "Hospital Name": "DR AGARWAL'S EYE HOSPITAL (ANNANAGAR)",
    "Address": "31, 2nd Ave, Block F, Annanagar East, Chennai, Tamil Nadu 600102",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206472",
    "Hospital Name": "DR AGARWALS EYE HOSPITAL (PERAMBUR)",
    "Address": "The Federation Square, B-63, Siva Elango Salai, Periyar Nagar, Perambur , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080468276",
    "Hospital Name": "DR.AGARWALS EYE HOSPITAL LTD (AMBATTUR)",
    "Address": "Plot No.50, Krishna Puram, Nainiammal Street, off MTH Road, Ambattur, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205079",
    "Hospital Name": "DR AGARWALS EYE HOSPITAL P LTD",
    "Address": "27, 100 Feet Road, Taramani Link Road, Velachery , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204119",
    "Hospital Name": "DR MEHTA HOSPITAL",
    "Address": "NO 2, MCNICHOLS ROAD, 3RD LANE, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207660",
    "Hospital Name": "DR RAVISHANKAR EYE CLINIC and NURSING HOME",
    "Address": "11, HUNTERS ROAD, VEPERY, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205246",
    "Hospital Name": "Dr Kumars Health Care Private Limited",
    "Address": "NO.16, 6TH CROSS STREET, NEW COLONY, CHROMPET, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206199",
    "Hospital Name": "DR. AGARWALS EYE HOSPITAL (AVADI)",
    "Address": "3, 1st Floor, Main Road, Kamaraj Nagar, Avadi, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201521",
    "Hospital Name": "DR. AGARWALS EYE HOSPITAL (EGMORE)",
    "Address": "No.479, PANTHEON ROAD, EGMORE, PIN -600008, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207899",
    "Hospital Name": "DR. AGARWALS EYE HOSPITAL (TIRUVALLUR)",
    "Address": "157 Jawaharlal Nehru Road , Thiruvallur, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206458",
    "Hospital Name": "DR. AGARWALS EYE HOSPITAL (Washermanpet)",
    "Address": "729, TH Road, New Washermenpet, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080353848",
    "Hospital Name": "Dr. Agarwal's Eye Hospital Ltd (TN - PORUR)",
    "Address": "49 Arcot Road, Porur, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080328846",
    "Hospital Name": "DR. K.K.SURGICAL and PAEDIATRIC CENTRE PVT LTD",
    "Address": "238, Velachery Main Road, Selaiyur East Tambaram, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202979",
    "Hospital Name": "DR. RAI MEMORIAL MEDICAL CENTRE",
    "Address": "562, Century Plaza, Anna Salai, Teynampet , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080351998",
    "Hospital Name": "DR. RAI-CBCC ONCOLOGY SERVICES PRIVATE LMITED",
    "Address": "Saveetha Medical College Campus, No.162, P.H.Road, Velappanchavadi, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080401297",
    "Hospital Name": "DR. RELA INSTITUTE and MEDICAL CENTRE",
    "Address": "7 CLC WORKS ROAD, NEW COLONY, CHROMEPET, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080421028",
    "Hospital Name": "DR. RELA INSTITUTE and MS HOSPITAL (RIMS HOSPITAL)",
    "Address": "NO:4/833, GNT ROAD, PADIYANALLUR, REDHILLS, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080385238",
    "Hospital Name": "Dr.Agarwal'S Eye Hospital ADYAR",
    "Address": "M49/M50, Classic Royal, L.B Road, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205444",
    "Hospital Name": "DR.AGARWALS EYE HOSPITAL (DURAISWAMY)",
    "Address": "Tdk Towers, No.6 Duraisamy Reddy Street, Tambaram, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205994",
    "Hospital Name": "Dr.Agarwal's Eye Hospital (Nanganallur)",
    "Address": "13, 2nd Street, Nanganallur, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206588",
    "Hospital Name": "DR.AGARWALS EYE HOSPITAL LTD.(CHENNAI)",
    "Address": "Old No.20, New No.33, 7th Avenue, Near Grt School, Ashok Nagar , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204560",
    "Hospital Name": "DR.ARVIND VISION CARE (CHENNAI)",
    "Address": "Old No.61 New No.3, Reddy Palayam Road, Mugappair West, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206755",
    "Hospital Name": "DR.MOHANS DIABETES SPECIALITIES CENTRE (CHENNAI)",
    "Address": "6-B, Conron Smith Road, GOPALAPURAM CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080333017",
    "Hospital Name": "DRR EYE CARE AND OCULOPLASTY HOSPITAL",
    "Address": "No.399, TRUNK ROAD, KARAYANCHAVDI , Poonamallee, Chennai - 600056",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080454507",
    "Hospital Name": "EASY MOM FERTILITY AND MATERNITY CARE",
    "Address": "Plot 1A, Mambakkam Main Road, Vengaivasal, Medavakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207332",
    "Hospital Name": "ESWAR MEDICAL FOUNDATION",
    "Address": "# 1, Bharathi Nagar, Redhills Road, Kolathur, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206489",
    "Hospital Name": "ESWARI NURSING HOME",
    "Address": "255, 10th Street, Srp Colony, Periyar Nagar, Kolathur , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080331518",
    "Hospital Name": "FAITH Multispecialty Hospital (Villivakkam)",
    "Address": "No, 33/17, Sannathi Street, Villivakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207349",
    "Hospital Name": "FOR ORTHO HOSPITAL",
    "Address": "NO:6&7 PALANIAPPA NAGAR, SRI RANGA GARDEN, 200FT ROAD, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207431",
    "Hospital Name": "FRONTIER LIFE LINE",
    "Address": "R30C, Ambattur Industrial Estate Rd, Chennai, Tamil Nadu 600101",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202986",
    "Hospital Name": "Frontline Eye Hospital",
    "Address": "New # 283, Old # 123, T T K Road Alwarpet, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205451",
    "Hospital Name": "GAJANAN HOSPITAL (A.G HOSPITAL)",
    "Address": "29, KAKKAN STREET, WEST TAMBARAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080203518",
    "Hospital Name": "GANGA HOSPITAL (THANCAVARAYAN ST)",
    "Address": "21, THANDAVARAYAN STREET, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080414433",
    "Hospital Name": "GEM Hospital and Research Center (Chennai)",
    "Address": "M.G.R Salai, Perungudi, Chennai - 600095",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080462731",
    "Hospital Name": "GERICARE HOSPITAL",
    "Address": "No.8, Dr. Nair Road, T-Nagar, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080328730",
    "Hospital Name": "Girishwari Hospital Private Ltd (ALWARPET)",
    "Address": "29, Chittaranjan Road, Alwarpet, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080383029",
    "Hospital Name": "GLB HOSPITALS AND ACUTE STORE CENTRE (CHENNAI)",
    "Address": "New No AH-15, 5th Street, Shanthi colony, Anna Nagar, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207417",
    "Hospital Name": "GLOBAL HOSPITAL and HEALTH CITY",
    "Address": "#439, Cheran Nagar, Perumbakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080340367",
    "Hospital Name": "GUNASEKARAN HOSPITAL PVT LTD (T NAGAR)",
    "Address": "NO.1, Thygarayanagar South, Chennai - 600017",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204096",
    "Hospital Name": "HANDE HOSPITAL",
    "Address": "No-44, Lakshmi Talkies Road, Shenoy Nagar, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206014",
    "Hospital Name": "HARIHARAN DIABETES and HEART CARE HOSPITALS",
    "Address": "NO.24 & 26, Swathi 29TH STREET, NANGANALLUR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205086",
    "Hospital Name": "HELIOS HOSPITAL (CHENNAI)",
    "Address": "NO.39, 7TH CROSS STREET, RAJALAKSHMI NAGAR, VELACHERY, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080304956",
    "Hospital Name": "HINDU MISSION HEALTH SERVICES [CHENNAI]",
    "Address": "100 FEET ROAD, HINDU COLONY NANGANALLUR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206021",
    "Hospital Name": "HINDU MISSION HOSPITAL (TAMBARAM)",
    "Address": "NO.108, G.S.T ROAD, TAMBARAM WEST, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080339545",
    "Hospital Name": "HYCARE SUPER SPECIALITY HOSPITALS",
    "Address": "NO.37, RAZACK GARDEN ROAD, M.M.D.A. COLONY, ARUMBAKKAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080203372",
    "Hospital Name": "ISWARYA FERTILITY SERVICES PRIVATE LIMITED (ADYAR)",
    "Address": "NO:13, 1st Main Road, Kasturibai Nagar, Adyar, CHENNAI-600020",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080371224",
    "Hospital Name": "IYYAPPA HOSPITALS AND DIABETES RESEARCH CENTRE",
    "Address": "OLD# 127/1,2 NEW # 308,310, MELPATTI PONNAPPAN STREET, VYASARPADI, CHENNAI - 600039",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080334571",
    "Hospital Name": "J V HOSPITALS",
    "Address": "No 31, Railway Border Road, Kodambakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080370920",
    "Hospital Name": "J.K.C.N (Unit of Medical Research Foundation)",
    "Address": "21, PYCROFTS GARDEN ROAD, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080200784",
    "Hospital Name": "JANAKI ENT NURSING HOME",
    "Address": "29, Nagamani Garden St, Mannady, George Town, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080331242",
    "Hospital Name": "JAYA EYE CARE CENTRE",
    "Address": "41/50, 4th Trust Cross Street, Mandavelipakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080493070",
    "Hospital Name": "JUPITER HOSPITAL (PERAMBUR)",
    "Address": "No.6, Venkatraman street, Perambur, Chennai - 600011",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080345225",
    "Hospital Name": "K M HOSPITAL (CHENNAI)",
    "Address": "64, MEDAVAKKAM TANK ROAD, KILPAUK, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080200937",
    "Hospital Name": "K.C. MULTISPECIALITY HOSPITALS",
    "Address": "138, 4th Street, Kamaraja Nagar, Avadi , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207790",
    "Hospital Name": "K.V.T SPECIALITY HOSPITAL",
    "Address": "Plot No.1,2,3, Ethirajsamy Salai, Erukkanchery , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080359451",
    "Hospital Name": "KALPANA EYE CARE HOSPITAL",
    "Address": "NO 2, BOOMADEVI NAGAR, GERUGAMBAKKAM, CHENNAI-600128",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080203136",
    "Hospital Name": "KARTHIC HOSPITAL (THIRUVALLUR)",
    "Address": "NO:727-730, T H ROAD, THIRUVOTTIYUR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205482",
    "Hospital Name": "KASTHURI HOSPITAL (WEST TAMBARAM)",
    "Address": "119, SHANMUGAM ROAD, WEST TAMBARAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080342217",
    "Hospital Name": "KAUVERY HCG CANCER CENTRE",
    "Address": "#199/90, MBC Tower, Luz Church Road, Alwarpet, Mylapore, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201118",
    "Hospital Name": "KAUVERY HOSPITAL (CHURCH ROAD)",
    "Address": "NO 199, LUZ CHURCH ROAD, MYLAPORE, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205390",
    "Hospital Name": "Kavitha ortho and multispeciality hospital",
    "Address": "144, RADHA NAGAR MAIN ROAD, CHROMEPET, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080422315",
    "Hospital Name": "KC HOSPITAL (CHENNAI)",
    "Address": "Old No.95, New No.440, Kavarapalayam, Avadi, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080337664",
    "Hospital Name": "KEDAR HOSPITAL",
    "Address": "19, VINAYAGAPURAM, MUGALIVAKKAM MAIN ROAD, PORUR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080366947",
    "Hospital Name": "KGJ Hospitals",
    "Address": "NO.14 & 129, RAILWAY STATION ROAD, KORATTUR, CHENNAI - 600080",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204720",
    "Hospital Name": "KHM HOSPITAL",
    "Address": "Ab-14/4907, 6th Main Road, Anna Nagar, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201743",
    "Hospital Name": "KKR ENT HOSPITAL AND RESEARCH INS PVT LTD",
    "Address": "NEW NO-274, OLD NO - 827, POONAMALLEE HIGH ROAD, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080429512",
    "Hospital Name": "KLARITI EYE CARE (CHENNAI)",
    "Address": "115, LAKSHMANASAMY SALAI, K.K.NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205666",
    "Hospital Name": "KM Multi Speciality Hospital",
    "Address": "#8 & 9, Annai Velankanninagar, Madhavaram Milk Colony, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080460447",
    "Hospital Name": "KPP MULTISPECIALITY HOSPITAL",
    "Address": "No:1/127, Srinivasa salai, Nanmangalam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202665",
    "Hospital Name": "KRISHNA EYE and ENT HOSPITALS",
    "Address": "39 Burkit Road, T. Nagar , Chennai - 600017",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207226",
    "Hospital Name": "KUMARAN EYE SPECIALITY CENTRE",
    "Address": "79, CHOOLAIMEDU HIGH ROAD, CHOOLAIMEDU, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080332010",
    "Hospital Name": "KUMARAN HOSPITAL (KILPAUK)",
    "Address": "214, P.H.ROAD, KILPAUK, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205932",
    "Hospital Name": "KVT HEALTH CENTRE",
    "Address": "#16, G.N.T Road, moolakadai , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204300",
    "Hospital Name": "Lakshmi Hospital (Chennai)",
    "Address": "# 47 GOVINDAN ROAD WEST MAMBALAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080203266",
    "Hospital Name": "Lakshmi Maternity Hospital",
    "Address": "New No.10, Old No.20, 3rd Avenue, Indira Nagar, Adyar, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202672",
    "Hospital Name": "LASER and LAPAROSCOPIC HOSPITAL (T-NAGAR)",
    "Address": "121, G.N. CHETTY ROAD, T-NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201774",
    "Hospital Name": "LIFE LINE MULTISPECIALITY HOSPITALS PVT LTD (AVADI RD)",
    "Address": "47/3, New Avadi Road, Near Kilpauk Post Office , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201781",
    "Hospital Name": "M N ORTHOPAEDIC HOSPITAL",
    "Address": "# 14, BANK STREET, KILPAK, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204041",
    "Hospital Name": "M R HOSPITAL",
    "Address": "NO.20, GOVINDAN STREET, AYYAVOO COLONY, AMINJIKARAI CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080337053",
    "Hospital Name": "M.N. Eye Hospital(SASTINAGAR)",
    "Address": "# 33, M.G ROAD, SASTRINAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080336452",
    "Hospital Name": "M.N.EYE HOSPITAL (TENDIARPET)",
    "Address": "781, T H ROAD, TENDIARPET, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080328877",
    "Hospital Name": "MAHALAKSHMI HOSPITAL",
    "Address": "37, M.T.H ROAD, AMBATTUR, CHENNAI-53",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080387287",
    "Hospital Name": "MAHALAKSHMI MULTISPECIALITY HOSPITAL",
    "Address": "NEW NO. 1/164, MOUNT POONAMALLEE HIGH ROAD, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205857",
    "Hospital Name": "MANGALAM HOSPITAL (CHENNAI)",
    "Address": "1, JCN Street, Poonamallee, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206625",
    "Hospital Name": "MAYA NURSING HOME",
    "Address": "B-225, 15TH AVENUE, ASHOK NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201392",
    "Hospital Name": "MEDICAL RESEARCH FOUNDATION (CHENNAI)",
    "Address": "18, COLLEGE ROAD, CHENNAI-600006",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204454",
    "Hospital Name": "MEDINDIA HOSPITAL",
    "Address": "83, VALLUVARKOTTAM HIGH ROAD, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080347533",
    "Hospital Name": "MEDWAY HOSPITALS (CHENNAI)",
    "Address": "NO:2/26, 1st MAIN ROAD, UNITED INDIA COLONY, KODAMBAKKAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080475298",
    "Hospital Name": "MEDWAY HOSPITALS (MOGAPPAIR)",
    "Address": "PC7, BHARATHI SALAI, MOGAPPAIR WEST, NOLAMBUR, CHENNAI - 600037",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080405356",
    "Hospital Name": "MEHTA MULTISPECIALITY HOSPITALS INDIA PRIVATE LIMITED",
    "Address": "GLOBAL CAMPUS , NO 50 , POONAMALLE HIGH ROAD , NUMBAL, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080410268",
    "Hospital Name": "MGM HEALTHCARE PRIVATE LIMITED (CHENNAI)",
    "Address": "No. 72, Nelson Manickam Road, Aminjikarai, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080362185",
    "Hospital Name": "MINT HOSPITALS",
    "Address": "19/1, 1ST AVENUE, SHASTRI NAGAR, ADYAR, CHENNAI - 600020",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206960",
    "Hospital Name": "MIOT HOSPITAL",
    "Address": "4/112, Mount Poonamalee Road, Manapakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080359338",
    "Hospital Name": "MMRV Hospital Pvt ltd",
    "Address": "No.5/PC 2, Bharathi Salai, Mogappair West, Chennai, Tamil Nadu",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080339408",
    "Hospital Name": "MOTHERHOOD HOSPITAL",
    "Address": "NO-542, TTK ROAD, ALWARPET, Teynampet, Chennai - 600018",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080341234",
    "Hospital Name": "Mount Multi Speciality Hospitals Pvt ltd (Chennai)",
    "Address": "63, Kesari Nagar Main Rd, Adambakkam, Chennai, Tamil Nadu 600088",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080026605",
    "Hospital Name": "MURUGAN HOSPITALS(CHENNAI)",
    "Address": "No-264/125, kilpauk garden road , kilpauk , Chennai - 600010",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202085",
    "Hospital Name": "MUTHU HOSPITAL",
    "Address": "NO.105, PULIANTHOPE HIGH ROAD, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201453",
    "Hospital Name": "NARAYANAA HOSPITAL",
    "Address": "18, Thana Street, Purasawalkam , Chennai - 600007",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080387119",
    "Hospital Name": "Neolife Children’s Hospital and Multispeciality",
    "Address": "11-15, Bharathidasan Street, AGS Colony, Madipakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080342903",
    "Hospital Name": "NEOLIFE CHILDRENS HOSPITAL",
    "Address": "14/1, SECOND ST, KANNAN NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080350120",
    "Hospital Name": "NEURO LIFE HOSPITAL (CHENNAI)",
    "Address": "No: 25, Alapakkam Main Rd, Janaki Nagar, Maduravoyal, Chennai, Tamil Nadu 600095",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201828",
    "Hospital Name": "NEW HOPE MEDICAL CENTER",
    "Address": "814, Poonamallee High Road, Kilpauk , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206274",
    "Hospital Name": "New Life Hospital [RAJAKALIPAKKAM]",
    "Address": "NO.174, APPAR ST, VELECHERY MAIN RD, RAJAKILPAKKAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080380974",
    "Hospital Name": "NEW RUTHRAAN HOSPITAL",
    "Address": "NO.383, KONNUR HIGH ROAD, AYANAVARAM, Chennai - 600023",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202214",
    "Hospital Name": "NICHANIS HOSPITAL",
    "Address": "No: 10, Arthon Road, Royapuram, Chennai-600013",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080327283",
    "Hospital Name": "NIRMALAS EYE CARE CENTRE (West Tambaram)",
    "Address": "108 / 5, Ayysaamy Street, West Tambaram, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080343955",
    "Hospital Name": "NM FERTILITY CENTRE AND HOSPITAL",
    "Address": "Plot No. 59, 4th avenue k.k.r nagar , Madhavaram, Chennai, Tamil Nadu - 600060",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201347",
    "Hospital Name": "ORTHOMED HOSPITAL",
    "Address": "83 (Old No.43) Royapettah High Road, Royapettah, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080193376",
    "Hospital Name": "PALLAVA HOSPITAL PRIVATE LTD.",
    "Address": "NO.19-A FIRST AVENUE, ASHOK NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080435605",
    "Hospital Name": "PANIMALAR MEDICAL COLLEGE HOSPITAL",
    "Address": "Varadharajapuram, Poonamallee, Chennai - 600123",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080333499",
    "Hospital Name": "PARVATHY ORTHO HOSPITAL (CHROMEPET)",
    "Address": "241, G S T ROAD, CHROMEPET, CHENNAI - 600044",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080203723",
    "Hospital Name": "PATERSON CANCER CENTRE",
    "Address": "175, N.S.K. SALAI VADAPALANI CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207783",
    "Hospital Name": "PAVITHRA HOSPITALS PVT LTD",
    "Address": "NO 7 ETHIRAJASWAMI SALAI, ERUKKENCHERY, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080344327",
    "Hospital Name": "Ponmalligai Hospital (Chennai)",
    "Address": "#1, Ist CROSS STREET, KAKKANJI NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080205147",
    "Hospital Name": "PRASANTH SUPERSPECIALITY HOSPITAL (VELACHERY)",
    "Address": "36 & 36A, Velachery Main Road, Velachery , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080490789",
    "Hospital Name": "PRASHANTH HOSPITAL KOLATHUR",
    "Address": "Block No.45 TS NO 1/4 & 1/5, Jawaharlal Nehru Road Kolathur Chennai - 600099",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204140",
    "Hospital Name": "PRASHANTH MULTISPECIALITY HOSPITALS (CHETPET)",
    "Address": "77, HARRINGTON ROAD, CHETPET, CHENNAI-31",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201514",
    "Hospital Name": "PRIME CARE NURSING HOME P LTD",
    "Address": "44, SAKETH NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207615",
    "Hospital Name": "PRIME INDIAN HOSPITALS PVT LTD",
    "Address": "NO 1051, POONAMALLEE HIGH ROAD, ARUNBAKKAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080203457",
    "Hospital Name": "PRIYA NURSING HOME",
    "Address": "NO:82, KAPPAL POLU ST, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080418387",
    "Hospital Name": "Promed Hospital (Chennai)",
    "Address": "1/10A East Coast Road, Thiruvanmiyur, Kottivakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204324",
    "Hospital Name": "PUBLIC HEALTH CENTRE",
    "Address": "174, Lake View Road, West Mambalam, Near Ayodhya Mandapam , Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202719",
    "Hospital Name": "R K EYE CENTRE",
    "Address": "14/20, Chari Street, T Nagar , Chennai - 600017",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080380868",
    "Hospital Name": "R.M.D. SPECIALITY HOSPITAL",
    "Address": "NO-162, KUNDRATHUR-SRIPERUMBUDUR MAIN ROAD, PARVATHI NAGAR, CHENNAI - 600069",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202399",
    "Hospital Name": "RAADHA RAJENDRAN HOSPITAL",
    "Address": "No.7-10, Vembuli Amman Koil Street, Alandur, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202726",
    "Hospital Name": "RADHATRI NETHRALAYA",
    "Address": "# 12, HINDI PRACHARA SABHA STREET, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080398474",
    "Hospital Name": "RAINBOW CHILDERNS HOSPITAL",
    "Address": "No. 157, Annasalai, Guindy, Chennai - 600015",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202733",
    "Hospital Name": "RAJAN EYE CARE HOSPITAL",
    "Address": "5, VIDYODAYA 2nd Street, T NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206830",
    "Hospital Name": "Rakshith Hospital Private Limited",
    "Address": "#153, Arcot Road, Sri Sai Square, Valasarawakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204751",
    "Hospital Name": "RATHI MED SPECIALITY HOSPITAL",
    "Address": "# 63, OLD NO.102, Q BLOCK 3RD AVENUE ANNANAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080393004",
    "Hospital Name": "RAVINA HOSPITAL (CHENNAI)",
    "Address": "NO-99, POONAMALLEE HIGH ROAD, MADURAVOYAL, CHENNAI -95",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202344",
    "Hospital Name": "RG STONE UROLOGY and LAPAROSCOPY HOSPITAL",
    "Address": "NO-391/392, ANNASALAI, SAIDAPET, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201873",
    "Hospital Name": "RIGHT HOSPITAL",
    "Address": "1, PROFESSOR SUBRAMANIAM STREET, KILPAUK, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080200814",
    "Hospital Name": "ROTARY CENTRAL MARGARET SIDNEY HOSPITAL (CHENNAI)",
    "Address": "13 7TH STREET, NANGANALLUR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080206847",
    "Hospital Name": "Royal Hospital",
    "Address": "#1, Jawaharlal Nehru Street, Valasarawakkam, Alwarthiru Nagar, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080396777",
    "Hospital Name": "RPS HOSPITALS PVT LTD",
    "Address": "NO-65/2, WATER CANAL ROAD, KORATTUR NORTH, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201217",
    "Hospital Name": "RSR'S TRINITY ACUTE CARE HOSPITAL",
    "Address": "33, DESIKAN ROAD, MYLAPORE, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080200821",
    "Hospital Name": "S S EYE HOSPITAL",
    "Address": "149, George Town, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207165",
    "Hospital Name": "S.B.S. HOSPITAL",
    "Address": "NATESAN NAGAR, VIRUGAMBAKKAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201330",
    "Hospital Name": "SAKTHI HOSPITAL and RESEARCH CENTRE",
    "Address": "175, BIG STREET, TRIPLICANE, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202375",
    "Hospital Name": "SANKARA NETHRALAYA (GST ROAD)",
    "Address": "No. 8, G.S.T. Road, Alandur, Guindy, Chennai, Tamil Nadu 600016",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080203938",
    "Hospital Name": "Sankara Nethralaya RA Puram",
    "Address": "R.A. Puram, New 30, Old - 73, Kamarajar Salai, Chennai - 600028",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080329058",
    "Hospital Name": "SARASWATHY SPECIALITY HOSPITAL",
    "Address": "Bazaar Main Rd, Sastri Nagar, Madipakkam, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201897",
    "Hospital Name": "SATHISH EYE HOSPITAL (kilpauk)",
    "Address": "NEW # 57, OLD # 15, ORMES ROAD, KILPAUK, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202047",
    "Hospital Name": "SEN HOSPITAL",
    "Address": "18, BUNDER GARDEN HOSPITAL STREET, PERAMBUR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080420465",
    "Hospital Name": "Senthil Priya Hospital",
    "Address": "No.5c/3, 5c/4, Sidco main road, Kkd nagar, Chennai - 600118",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080448551",
    "Hospital Name": "SHAARAVE MULTI SPECIALITY HOSPITAL",
    "Address": "134, Mint Street, Opp To Ramar Koil, Sowcarpet, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080149120",
    "Hospital Name": "SHADITHYA HOSPITAL",
    "Address": "NO.7 TANNERY STREET, PALLAVARAM, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080358386",
    "Hospital Name": "SHANMUGAM MULTISPECIALITY HOSPITAL",
    "Address": "NO.139, EAST CHURCH STREET, ROYAPURAM, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204799",
    "Hospital Name": "SHIVAS EYE CARE",
    "Address": "PLOT NO.1740, 18TH MAIN ROAD, ANNA NAGAR, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080207080",
    "Hospital Name": "SIBI HOSPITAL",
    "Address": "PLOT NO 5, MEDAVAKKAM MAIN ROAD, CHENNAI",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080201170",
    "Hospital Name": "SINUS AND NOSE HOSPITAL",
    "Address": "35 A Santhome High Road, Mylapore, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080381865",
    "Hospital Name": "SIVAM HOSPITAL (CHENNAI)",
    "Address": "PLOT NO:3, SRINIVASAN STREET, JAGATHAMBAL COLONY, Chennai - 600091",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080203327",
    "Hospital Name": "SOORIYA HOSPITAL",
    "Address": "1, Arunachalam Road, Saligramam, Chennai - 600093",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080204805",
    "Hospital Name": "SOUNDARA PANDIAN BONE AND JOINT (CHENNAI)",
    "Address": "A-16, 3rd Main Road, Anna-Nagar , Chennai - 600040",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080202115",
    "Hospital Name": "SRI BALAJI HOSPITAL (BRICKLIN ROAD)",
    "Address": "Old No:36, New No: 77, Bricklin Road, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080412217",
    "Hospital Name": "SRI BALAJI HOSPITAL (CHENNAI)",
    "Address": "No.318/3B2, Chennai Bye-Pass Service Road, Mogappair West, Chennai",
    "City": "CHENNAI"
  },
  {
    "Rohini ID": "8900080361461",
    "Hospital Name": "SRI HOSPITALS (CHENNAI)",
    "Address": "Old.No.7, New.No.32, Varadharajaperumal koil street, Tondiarpet, Chennai",
    "City": "CHENNAI"
  }
];

const mainFilePath = path.join(__dirname, '../hospitals.json');

fs.readFile(mainFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read hospitals.json:', err);
    return;
  }

  let existingList = [];
  try {
    existingList = JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse existing hospitals.json:', e);
    return;
  }

  let nextSNo = existingList.length > 0 ? Math.max(...existingList.map(h => h.s_no || 0)) + 1 : 1;

  const normalizedChennai = chennaiData.map(ch => {
    // Extract PIN from Address if possible
    const pinMatch = ch.Address.match(/\b\d{6}\b/);
    const pin = pinMatch ? pinMatch[0] : "600001";

    return {
      s_no: nextSNo++,
      hospital_name: ch["Hospital Name"] ? ch["Hospital Name"].trim() : "Unnamed Hospital",
      address: ch.Address ? ch.Address.replace(/\r\n/g, ' ').replace(/\n/g, ' ').trim() : "",
      state: "Tamil Nadu",
      city: "Chennai",
      pin: pin,
      rohini_id: ch["Rohini ID"] ? ch["Rohini ID"].toString().trim() : ""
    };
  });

  const mergedList = [...existingList, ...normalizedChennai];

  fs.writeFile(mainFilePath, JSON.stringify(mergedList, null, 2), 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Failed to write merged hospitals list:', writeErr);
      return;
    }
    console.log(`Successfully merged ${normalizedChennai.length} Chennai hospitals! Total database records: ${mergedList.length}`);
  });
});
