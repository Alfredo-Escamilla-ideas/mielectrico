// Catálogo EV/PHEV comercializados en España (2020-2026)
// Fuentes: km77.com, lugenergy.com, carwow.es, xataka.com, quecochemecompro.com
// 48 marcas · 239 modelos · 535 versiones
// Última actualización: 2026-04-06

export interface VehicleVersion {
  name: string
  versions: string[]
}

export interface VehicleMake {
  make: string
  models: VehicleVersion[]
}

export const EV_CATALOG: VehicleMake[] = [
  {
    "make": "Alfa Romeo",
    "models": [
      {
        "name": "Junior",
        "versions": [
          "Electric 54 kWh"
        ]
      },
      {
        "name": "Tonale",
        "versions": [
          "1.3 Plug-In Hybrid Q4 270 CV",
          "Sport Speciale 1.3 Plug-In Hybrid Q4 270 CV",
          "Sprint 1.3 Plug-In Hybrid Q4 270 CV",
          "Ti 1.3 Plug-In Hybrid Q4 270 CV",
          "Veloce 1.3 Plug-In Hybrid Q4 270 CV"
        ]
      }
    ]
  },
  {
    "make": "Audi",
    "models": [
      {
        "name": "A3 Sportback",
        "versions": [
          "Advanced TFSI e 204 CV",
          "Genuine Edition TFSI e 204 CV",
          "S line TFSI e 204 CV"
        ]
      },
      {
        "name": "A3 allstreet",
        "versions": [
          "Advanced TFSI e 204 CV",
          "Genuine TFSI e 204 CV"
        ]
      },
      {
        "name": "A5",
        "versions": [
          "e-hybrid Advanced quattro 299 CV",
          "e-hybrid Black line quattro 367 CV",
          "e-hybrid Business quattro 299 CV",
          "e-hybrid S line quattro 299 CV"
        ]
      },
      {
        "name": "A5 Avant",
        "versions": [
          "e-hybrid Advanced quattro 299 CV",
          "e-hybrid Black line quattro 367 CV",
          "e-hybrid Business quattro 299 CV",
          "e-hybrid S line quattro 299 CV"
        ]
      },
      {
        "name": "A6",
        "versions": [
          "e-hybrid Advanced quattro 299 CV",
          "e-hybrid Black line quattro 299 CV",
          "e-hybrid Black line quattro 367 CV",
          "e-hybrid S line quattro 299 CV"
        ]
      },
      {
        "name": "A6 Avant",
        "versions": [
          "e-hybrid Advanced quattro 299 CV",
          "e-hybrid Black line quattro 299 CV",
          "e-hybrid Black line quattro 367 CV",
          "e-hybrid S line quattro 299 CV"
        ]
      },
      {
        "name": "A8",
        "versions": [
          "60 TFSIe quattro"
        ]
      },
      {
        "name": "A8 L",
        "versions": [
          "60 TFSIe quattro"
        ]
      },
      {
        "name": "Q3 Advanced",
        "versions": [
          "e-hybrid 272 CV S tronic"
        ]
      },
      {
        "name": "Q3 Black line",
        "versions": [
          "e-hybrid 272 CV S tronic"
        ]
      },
      {
        "name": "Q3 Business",
        "versions": [
          "e-hybrid 272 CV S tronic"
        ]
      },
      {
        "name": "Q3 Progressive",
        "versions": [
          "e-hybrid 272 CV S tronic"
        ]
      },
      {
        "name": "Q3 S line",
        "versions": [
          "e-hybrid 272 CV S tronic"
        ]
      },
      {
        "name": "Q3 Sportback Advanced",
        "versions": [
          "e-hybrid 272 CV S tronic"
        ]
      },
      {
        "name": "Q3 Sportback Black line",
        "versions": [
          "e-hybrid 272 CV S tronic"
        ]
      },
      {
        "name": "Q3 Sportback Business",
        "versions": [
          "e-hybrid 272 CV S tronic"
        ]
      },
      {
        "name": "Q3 Sportback Progressive",
        "versions": [
          "e-hybrid 272 CV S tronic"
        ]
      },
      {
        "name": "Q3 Sportback S line",
        "versions": [
          "e-hybrid 272 CV S tronic"
        ]
      },
      {
        "name": "Q4 Sportback e-tron",
        "versions": [
          "40 82 kWh RWD"
        ]
      },
      {
        "name": "Q4 e-tron",
        "versions": [
          "35 52 kWh RWD",
          "40 82 kWh RWD",
          "45 82 kWh quattro"
        ]
      },
      {
        "name": "Q5",
        "versions": [
          "e-hybrid Advanced quattro 299 CV",
          "e-hybrid Black competition quattro 367 CV",
          "e-hybrid Black line quattro 299 CV",
          "e-hybrid S line quattro 299 CV"
        ]
      },
      {
        "name": "Q5 Sportback",
        "versions": [
          "e-hybrid Advanced quattro 299 CV",
          "e-hybrid Black competition quattro 367 CV",
          "e-hybrid Black line quattro 299 CV",
          "e-hybrid S line quattro 299 CV"
        ]
      },
      {
        "name": "Q6 e-tron",
        "versions": [
          "RWD 100 kWh",
          "quattro 100 kWh SQ6"
        ]
      },
      {
        "name": "Q7",
        "versions": [
          "Advanced 55 TFSIe quattro",
          "Black line 60 TFSIe quattro",
          "S line 55 TFSIe quattro"
        ]
      },
      {
        "name": "Q8",
        "versions": [
          "Black line 60 TFSIe quattro",
          "S line 55 TFSIe quattro"
        ]
      },
      {
        "name": "RS 5",
        "versions": [
          "PHEV"
        ]
      },
      {
        "name": "RS 5 Avant",
        "versions": [
          "PHEV"
        ]
      },
      {
        "name": "RS e-tron GT",
        "versions": [
          "Performance 105 kWh"
        ]
      },
      {
        "name": "e-tron GT",
        "versions": [
          "quattro 93 kWh"
        ]
      }
    ]
  },
  {
    "make": "BMW",
    "models": [
      {
        "name": "225e",
        "versions": [
          "xDrive Active Tourer"
        ]
      },
      {
        "name": "330e",
        "versions": [
          "Berlina"
        ]
      },
      {
        "name": "330e xDrive",
        "versions": [
          "Touring"
        ]
      },
      {
        "name": "530e",
        "versions": [
          "Berlina",
          "Touring"
        ]
      },
      {
        "name": "530e xDrive",
        "versions": [
          "Berlina",
          "Touring"
        ]
      },
      {
        "name": "550e xDrive",
        "versions": [
          "Berlina",
          "Touring"
        ]
      },
      {
        "name": "750e xDrive",
        "versions": [
          "Berlina"
        ]
      },
      {
        "name": "M5",
        "versions": [
          "PHEV"
        ]
      },
      {
        "name": "M5 Touring",
        "versions": [
          "PHEV"
        ]
      },
      {
        "name": "M760e xDrive",
        "versions": [
          "Berlina"
        ]
      },
      {
        "name": "X1",
        "versions": [
          "xDrive25e",
          "xDrive30e"
        ]
      },
      {
        "name": "X3",
        "versions": [
          "30e xDrive"
        ]
      },
      {
        "name": "X5",
        "versions": [
          "xDrive50e"
        ]
      },
      {
        "name": "XM",
        "versions": [
          "50e"
        ]
      },
      {
        "name": "XM Label",
        "versions": [
          "PHEV"
        ]
      },
      {
        "name": "i4",
        "versions": [
          "M50 83,9 kWh",
          "eDrive40 83,9 kWh"
        ]
      },
      {
        "name": "i5",
        "versions": [
          "M60 xDrive 84 kWh",
          "eDrive40 84 kWh"
        ]
      },
      {
        "name": "i7",
        "versions": [
          "xDrive60 105,7 kWh"
        ]
      },
      {
        "name": "iX",
        "versions": [
          "xDrive40 76,6 kWh",
          "xDrive50 111,5 kWh"
        ]
      },
      {
        "name": "iX3",
        "versions": [
          "50 xDrive 108,7 kWh"
        ]
      }
    ]
  },
  {
    "make": "BYD",
    "models": [
      {
        "name": "Atto 2",
        "versions": [
          "DM-i Active",
          "DM-i Boost"
        ]
      },
      {
        "name": "Atto 3",
        "versions": [
          "Long Range 82 kWh",
          "Standard Range 60 kWh"
        ]
      },
      {
        "name": "Dolphin",
        "versions": [
          "Long Range 60 kWh",
          "Standard Range 44 kWh"
        ]
      },
      {
        "name": "Dolphin Surf",
        "versions": [
          "Long Range 60 kWh",
          "Standard 45 kWh"
        ]
      },
      {
        "name": "Han",
        "versions": [
          "EV AWD 85 kWh"
        ]
      },
      {
        "name": "Seal",
        "versions": [
          "AWD 82 kWh",
          "RWD 82 kWh"
        ]
      },
      {
        "name": "Seal 6",
        "versions": [
          "DM-i Boost",
          "DM-i Comfort",
          "DM-i Comfort Lite",
          "DM-i Touring Boost",
          "DM-i Touring Comfort",
          "DM-i Touring Comfort Lite"
        ]
      },
      {
        "name": "Seal U",
        "versions": [
          "DM-i Boost",
          "DM-i Comfort",
          "DM-i Design AWD"
        ]
      },
      {
        "name": "Sealion 6",
        "versions": [
          "AWD"
        ]
      },
      {
        "name": "Tang",
        "versions": [
          "EV 4WD 108 kWh"
        ]
      }
    ]
  },
  {
    "make": "Bentley",
    "models": [
      {
        "name": "Bentayga",
        "versions": [
          "S Hybrid"
        ]
      }
    ]
  },
  {
    "make": "Bestune",
    "models": [
      {
        "name": "Joyee 07",
        "versions": [
          "PHEV"
        ]
      }
    ]
  },
  {
    "make": "CUPRA",
    "models": [
      {
        "name": "Born",
        "versions": [
          "58 kWh 231 CV",
          "77 kWh 286 CV"
        ]
      },
      {
        "name": "Formentor",
        "versions": [
          "1.5 eHybrid 204 CV DSG",
          "1.5 eHybrid 204 CV DSG Beyond",
          "VZ 1.5 eHybrid 272 CV DSG",
          "VZ Extreme 1.5 eHybrid 272 CV DSG"
        ]
      },
      {
        "name": "Le\u00f3n 5p",
        "versions": [
          "VZ Extreme eHybrid 272 CV DSG",
          "VZ eHybrid 272 CV DSG",
          "eHybrid 204 CV DSG",
          "eHybrid 204 CV DSG Beyond"
        ]
      },
      {
        "name": "Le\u00f3n Sportstourer",
        "versions": [
          "VZ Extreme eHybrid 272 CV DSG",
          "VZ eHybrid 272 CV DSG",
          "eHybrid 204 CV DSG",
          "eHybrid 204 CV DSG Beyond"
        ]
      },
      {
        "name": "Tavascan",
        "versions": [
          "77 kWh AWD 340 CV",
          "77 kWh RWD"
        ]
      },
      {
        "name": "Terramar",
        "versions": [
          "1.5 eHybrid 204 CV DSG",
          "1.5 eHybrid 204 CV DSG Beyond",
          "VZ 1.5 eHybrid 272 CV DSG"
        ]
      }
    ]
  },
  {
    "make": "Citro\u00ebn",
    "models": [
      {
        "name": "C5 Aircross",
        "versions": [
          "Business Plug-in Hybrid 225 CV",
          "Max Plug-in Hybrid 225 CV",
          "Plus Plug-in Hybrid 225 CV"
        ]
      },
      {
        "name": "\u00eb-C3",
        "versions": [
          "50 kWh"
        ]
      },
      {
        "name": "\u00eb-C4",
        "versions": [
          "54 kWh"
        ]
      }
    ]
  },
  {
    "make": "DFSK",
    "models": [
      {
        "name": "E5",
        "versions": [
          "Intelligent"
        ]
      }
    ]
  },
  {
    "make": "DS",
    "models": [
      {
        "name": "N\u00ba4",
        "versions": [
          "Plug-in Hybrid 240 CV Jules Verne",
          "Plug-in Hybrid 240 CV Pallas",
          "Plug-in Hybrid 240 CV Performance Line",
          "Plug-in Hybrid 240 CV \u00c9toile"
        ]
      }
    ]
  },
  {
    "make": "Ebro",
    "models": [
      {
        "name": "s700",
        "versions": [
          "PHEV Luxury",
          "PHEV Premium"
        ]
      },
      {
        "name": "s800",
        "versions": [
          "PHEV Luxury",
          "PHEV Premium"
        ]
      },
      {
        "name": "s900",
        "versions": [
          "PHEV 4x4 Luxury"
        ]
      }
    ]
  },
  {
    "make": "Fiat",
    "models": [
      {
        "name": "500e",
        "versions": [
          "Action 23,8 kWh",
          "Icon 42 kWh",
          "La Prima 42 kWh Cabrio"
        ]
      }
    ]
  },
  {
    "make": "Ford",
    "models": [
      {
        "name": "Capri",
        "versions": [
          "Select Rango Extendido RWD 77 kWh"
        ]
      },
      {
        "name": "Explorer",
        "versions": [
          "Standard Range RWD 77 kWh"
        ]
      },
      {
        "name": "Grand Tourneo Connect",
        "versions": [
          "Active PHEV 150 CV",
          "Titanium PHEV 150 CV",
          "Trend 1.5 EcoBoost PHEV 150 CV",
          "Trend PHEV 150 CV 7 plazas"
        ]
      },
      {
        "name": "Grand Tourneo Custom",
        "versions": [
          "Active 2.5 PHEV 232 CV",
          "Titanium 2.5 PHEV 232 CV",
          "Titanium X 2.5 PHEV 232 CV"
        ]
      },
      {
        "name": "Kuga",
        "versions": [
          "Active X 2.5 PHEV 243 CV",
          "BlueCruise Edition 2.5 PHEV 243 CV",
          "ST-Line 2.5 PHEV 243 CV",
          "ST-Line X 2.5 PHEV 243 CV",
          "Titanium 2.5 PHEV 243 CV"
        ]
      },
      {
        "name": "Mustang Mach-E",
        "versions": [
          "Extended Range AWD 91 kWh",
          "Extended Range RWD 91 kWh",
          "Standard Range RWD 75 kWh"
        ]
      },
      {
        "name": "Ranger",
        "versions": [
          "MS-RT Doble Cabina 2.3 PHEV 280 CV",
          "Stormtrak Doble Cabina 2.3 PHEV 280 CV",
          "Wildtrak Doble Cabina 2.3 PHEV 280 CV",
          "Wildtrak Doble Cabina 2.3 PHEV 280 CV (v2)",
          "XLT Doble Cabina 2.3 PHEV 280 CV"
        ]
      },
      {
        "name": "Tourneo Connect",
        "versions": [
          "Active 1.5 EcoBoost PHEV 150 CV",
          "Titanium 1.5 EcoBoost PHEV 150 CV",
          "Trend 1.5 EcoBoost PHEV 150 CV"
        ]
      },
      {
        "name": "Tourneo Custom",
        "versions": [
          "Active 2.5 PHEV 232 CV",
          "Sport 2.5 PHEV 232 CV",
          "Titanium 2.5 PHEV 232 CV",
          "Titanium X 2.5 PHEV 232 CV"
        ]
      },
      {
        "name": "Transit Custom",
        "versions": [
          "Kombi L1 2.5 PHEV 232 CV Limited",
          "Kombi L1 2.5 PHEV 232 CV Trend",
          "Kombi L2 2.5 PHEV 232 CV Limited",
          "Kombi L2 2.5 PHEV 232 CV Trend"
        ]
      }
    ]
  },
  {
    "make": "Geely",
    "models": [
      {
        "name": "Starray",
        "versions": [
          "EM-i MAX+",
          "EM-i PRO",
          "EM-i PRO+"
        ]
      }
    ]
  },
  {
    "make": "Honda",
    "models": [
      {
        "name": "CR-V",
        "versions": [
          "Advance Tech Plug-In Hybrid 4x2"
        ]
      },
      {
        "name": "e:Ny1",
        "versions": [
          "68,8 kWh"
        ]
      }
    ]
  },
  {
    "make": "Hyundai",
    "models": [
      {
        "name": "Ioniq 5",
        "versions": [
          "Long Range AWD 77,4 kWh",
          "Long Range RWD 77,4 kWh",
          "Standard Range 58 kWh"
        ]
      },
      {
        "name": "Ioniq 6",
        "versions": [
          "Long Range AWD 77,4 kWh",
          "Long Range RWD 77,4 kWh",
          "Standard Range RWD 53 kWh"
        ]
      },
      {
        "name": "Kona EV",
        "versions": [
          "Long Range 65,4 kWh",
          "Standard 48,4 kWh"
        ]
      },
      {
        "name": "Santa Fe",
        "versions": [
          "Calligraphy 1.6 T-GDI PHEV 253 CV 4x4",
          "Maxx 1.6 T-GDI PHEV 253 CV 4x4",
          "Style 1.6 T-GDI PHEV 253 CV 4x4",
          "Style Green 1.6 T-GDI PHEV 253 CV 4x4",
          "Tecno 1.6 T-GDI PHEV 253 CV 4x4"
        ]
      },
      {
        "name": "Tucson",
        "versions": [
          "Black Line 1.6 T-GDi PHEV 288 CV",
          "Klass 1.6 T-GDi PHEV 288 CV",
          "N Line 1.6 T-GDi PHEV 288 CV",
          "N Line 1.6 T-GDi PHEV 288 CV 4x4",
          "N Line Style 1.6 T-GDi PHEV 288 CV 4x4",
          "Style 1.6 T-GDi PHEV 288 CV",
          "Style 1.6 T-GDi PHEV 288 CV 4x4",
          "Tecno 1.6 T-GDi PHEV 288 CV",
          "Tecno 1.6 T-GDi PHEV 288 CV 4x4"
        ]
      }
    ]
  },
  {
    "make": "Jaecoo",
    "models": [
      {
        "name": "7",
        "versions": [
          "SHS PHEV Exclusive",
          "SHS PHEV Select"
        ]
      },
      {
        "name": "8",
        "versions": [
          "SHS Exclusive 5 plazas",
          "SHS Exclusive 7 plazas"
        ]
      },
      {
        "name": "J7 EV",
        "versions": [
          "70,3 kWh"
        ]
      }
    ]
  },
  {
    "make": "Jeep",
    "models": [
      {
        "name": "Avenger",
        "versions": [
          "Electric 54 kWh"
        ]
      },
      {
        "name": "Compass",
        "versions": [
          "4xe PHEV 190 CV Altitude",
          "4xe PHEV 240 CV North Star",
          "4xe PHEV 240 CV Summit"
        ]
      },
      {
        "name": "Grand Cherokee",
        "versions": [
          "4xe Summit Reserve"
        ]
      },
      {
        "name": "Wrangler",
        "versions": [
          "4xe PHEV 381 CV Rubicon",
          "4xe PHEV 381 CV Sahara"
        ]
      }
    ]
  },
  {
    "make": "Karma",
    "models": [
      {
        "name": "Revero",
        "versions": [
          "PHEV"
        ]
      }
    ]
  },
  {
    "make": "Kia",
    "models": [
      {
        "name": "EV3",
        "versions": [
          "Long Range 81 kWh",
          "Standard Range 58 kWh"
        ]
      },
      {
        "name": "EV4",
        "versions": [
          "Air 81 kWh 204 CV"
        ]
      },
      {
        "name": "EV6",
        "versions": [
          "GT",
          "Long Range AWD",
          "Long Range RWD",
          "Standard Range RWD"
        ]
      },
      {
        "name": "EV9",
        "versions": [
          "Long Range AWD 7 plazas",
          "Long Range RWD 6 plazas"
        ]
      },
      {
        "name": "Niro",
        "versions": [
          "1.6 GDi PHEV 171 CV Concept",
          "1.6 GDi PHEV 171 CV Drive",
          "1.6 GDi PHEV 171 CV Emotion"
        ]
      },
      {
        "name": "Niro EV",
        "versions": [
          "Long Range 64.8 kWh"
        ]
      },
      {
        "name": "XCeed",
        "versions": [
          "eDrive 1.6 PHEV 141 CV",
          "eMotion 1.6 PHEV 141 CV",
          "eTech 1.6 PHEV 141 CV"
        ]
      }
    ]
  },
  {
    "make": "Koenigsegg",
    "models": [
      {
        "name": "Gemera",
        "versions": [
          "PHEV"
        ]
      }
    ]
  },
  {
    "make": "Land Rover",
    "models": [
      {
        "name": "Defender 110",
        "versions": [
          "S PHEV",
          "X PHEV",
          "X-Dynamic HSE PHEV",
          "X-Dynamic SE PHEV"
        ]
      },
      {
        "name": "Discovery Sport",
        "versions": [
          "Dynamic S PHEV",
          "Landmark PHEV"
        ]
      },
      {
        "name": "Range Rover",
        "versions": [
          "P460e PHEV Autobiography Batalla Larga",
          "P460e PHEV Autobiography Batalla Normal",
          "P460e PHEV HSE Batalla Larga",
          "P460e PHEV HSE Batalla Normal",
          "P460e PHEV SE Batalla Normal",
          "P550e PHEV Autobiography Batalla Normal",
          "P550e PHEV HSE Batalla Normal",
          "P550e PHEV SV Batalla Normal"
        ]
      },
      {
        "name": "Range Rover Evoque",
        "versions": [
          "Autobiography PHEV P270e",
          "Dynamic SE PHEV P270e",
          "S PHEV P270e"
        ]
      },
      {
        "name": "Range Rover Sport",
        "versions": [
          "Autobiography P550e PHEV",
          "Dynamic HSE P460e PHEV",
          "S P460e PHEV",
          "SE P460e PHEV"
        ]
      },
      {
        "name": "Range Rover Velar",
        "versions": [
          "P400e PHEV Dynamic HSE",
          "P400e PHEV Dynamic SE",
          "P400e PHEV S"
        ]
      }
    ]
  },
  {
    "make": "Leapmotor",
    "models": [
      {
        "name": "B10",
        "versions": [
          "Design REEV Hybrid",
          "Life REEV Hybrid"
        ]
      },
      {
        "name": "C10",
        "versions": [
          "BEV 69,9 kWh",
          "Design REEV",
          "Style REEV"
        ]
      },
      {
        "name": "T03",
        "versions": [
          "37,3 kWh"
        ]
      }
    ]
  },
  {
    "make": "Lexus",
    "models": [
      {
        "name": "NX 450h+",
        "versions": [
          "4x4 Executive+",
          "4x4 F Sport",
          "4x4 Luxury",
          "4x4 Premium+"
        ]
      },
      {
        "name": "RX 450h+",
        "versions": [
          "Business",
          "Executive+",
          "F Design",
          "Luxury"
        ]
      },
      {
        "name": "RZ 450e",
        "versions": [
          "71,4 kWh AWD"
        ]
      },
      {
        "name": "UX 300e",
        "versions": [
          "72,8 kWh"
        ]
      }
    ]
  },
  {
    "make": "Lynk & Co",
    "models": [
      {
        "name": "01",
        "versions": [
          "Core",
          "More"
        ]
      },
      {
        "name": "08",
        "versions": [
          "Core",
          "More"
        ]
      }
    ]
  },
  {
    "make": "MG",
    "models": [
      {
        "name": "HS",
        "versions": [
          "PHEV Comfort",
          "PHEV Luxury"
        ]
      },
      {
        "name": "MG4",
        "versions": [
          "Long Range 77 kWh",
          "Standard 51 kWh",
          "XPOWER AWD 77 kWh"
        ]
      },
      {
        "name": "MGS9",
        "versions": [
          "PHEV Comfort",
          "PHEV Premium"
        ]
      },
      {
        "name": "Marvel R",
        "versions": [
          "Electric AWD 70 kWh"
        ]
      },
      {
        "name": "ZS EV",
        "versions": [
          "Long Range 72,6 kWh",
          "Standard 51,1 kWh"
        ]
      }
    ]
  },
  {
    "make": "MINI",
    "models": [
      {
        "name": "Aceman",
        "versions": [
          "E 54,2 kWh"
        ]
      },
      {
        "name": "Countryman",
        "versions": [
          "E 64,7 kWh"
        ]
      },
      {
        "name": "Electric",
        "versions": [
          "Hatchback 40,7 kWh"
        ]
      }
    ]
  },
  {
    "make": "Mazda",
    "models": [
      {
        "name": "CX-60",
        "versions": [
          "e-SKYACTIV PHEV Exclusive-Line",
          "e-SKYACTIV PHEV Homura",
          "e-SKYACTIV PHEV Homura Plus",
          "e-SKYACTIV PHEV Prime-Line",
          "e-SKYACTIV PHEV Takumi",
          "e-SKYACTIV PHEV Takumi Plus"
        ]
      },
      {
        "name": "CX-80",
        "versions": [
          "Exclusive-Line 2.5 E-Skyactiv PHEV 327 CV AWD",
          "Homura 2.5 E-Skyactiv PHEV 327 CV AWD",
          "Homura Plus 2.5 E-Skyactiv PHEV 327 CV AWD",
          "Takumi 2.5 E-Skyactiv PHEV 327 CV AWD",
          "Takumi Plus 2.5 E-Skyactiv PHEV 327 CV AWD"
        ]
      },
      {
        "name": "MX-30",
        "versions": [
          "e-SKYACTIV 35,5 kWh"
        ]
      }
    ]
  },
  {
    "make": "McLaren",
    "models": [
      {
        "name": "Artura",
        "versions": [
          "Coup\u00e9 PHEV",
          "Spider PHEV"
        ]
      }
    ]
  },
  {
    "make": "Mercedes-Benz",
    "models": [
      {
        "name": "A 250 e",
        "versions": [
          "EQ Hybrid"
        ]
      },
      {
        "name": "AMG C 63 S",
        "versions": [
          "E Performance Berlina",
          "E Performance Estate"
        ]
      },
      {
        "name": "AMG E 53 Hybrid",
        "versions": [
          "4MATIC+ Berlina",
          "4MATIC+ Berlina AMG Dynamic Plus",
          "4MATIC+ Estate",
          "4MATIC+ Estate AMG Dynamic Plus"
        ]
      },
      {
        "name": "AMG GLC 63 S",
        "versions": [
          "E Performance",
          "E Performance Coup\u00e9"
        ]
      },
      {
        "name": "AMG GLE 53 Hybrid",
        "versions": [
          "4MATIC+",
          "4MATIC+ Coup\u00e9"
        ]
      },
      {
        "name": "AMG GT 4 Puertas",
        "versions": [
          "63 S E Performance"
        ]
      },
      {
        "name": "AMG GT 63 S",
        "versions": [
          "E Performance 4 puertas Coup\u00e9",
          "E Performance Coup\u00e9"
        ]
      },
      {
        "name": "AMG SL 63 S",
        "versions": [
          "E 4MATIC+ PHEV"
        ]
      },
      {
        "name": "B 250 e",
        "versions": [
          "EQ Hybrid"
        ]
      },
      {
        "name": "C 300 de",
        "versions": [
          "4MATIC Berlina EQ Hybrid",
          "4MATIC Estate EQ Hybrid",
          "Berlina EQ Hybrid",
          "Estate EQ Hybrid"
        ]
      },
      {
        "name": "C 300 e",
        "versions": [
          "Berlina EQ Hybrid",
          "Estate EQ Hybrid"
        ]
      },
      {
        "name": "CLA",
        "versions": [
          "250+ 85 kWh",
          "350 4MATIC 85 kWh"
        ]
      },
      {
        "name": "CLE 300 e",
        "versions": [
          "Coup\u00e9 EQ Hybrid"
        ]
      },
      {
        "name": "E 300 de",
        "versions": [
          "4MATIC All-Terrain EQ Hybrid",
          "4MATIC Berlina EQ Hybrid",
          "4MATIC Estate EQ Hybrid",
          "Berlina EQ Hybrid",
          "Estate EQ Hybrid"
        ]
      },
      {
        "name": "E 300 e",
        "versions": [
          "Berlina EQ Hybrid",
          "Estate EQ Hybrid"
        ]
      },
      {
        "name": "EQA",
        "versions": [
          "250 66,5 kWh",
          "300 4MATIC 66,5 kWh"
        ]
      },
      {
        "name": "EQB",
        "versions": [
          "300 4MATIC 66,5 kWh"
        ]
      },
      {
        "name": "EQE",
        "versions": [
          "300 90,6 kWh",
          "500 4MATIC 90,6 kWh"
        ]
      },
      {
        "name": "EQS",
        "versions": [
          "450+ 107,8 kWh",
          "500 4MATIC 118 kWh"
        ]
      },
      {
        "name": "GLA 250 e",
        "versions": [
          "EQ Hybrid"
        ]
      },
      {
        "name": "GLC 300 de",
        "versions": [
          "4MATIC Coup\u00e9 EQ Hybrid",
          "4MATIC EQ Hybrid"
        ]
      },
      {
        "name": "GLC 300 e",
        "versions": [
          "4MATIC Coup\u00e9 EQ Hybrid",
          "4MATIC EQ Hybrid"
        ]
      },
      {
        "name": "GLE 350 de",
        "versions": [
          "4MATIC Coup\u00e9 EQ Hybrid",
          "4MATIC EQ Hybrid"
        ]
      },
      {
        "name": "GLE 400 e",
        "versions": [
          "4MATIC Coup\u00e9 EQ Hybrid",
          "4MATIC EQ Hybrid"
        ]
      },
      {
        "name": "S 450 e",
        "versions": [
          "EQ Hybrid",
          "EQ Hybrid Largo"
        ]
      },
      {
        "name": "S 580 e",
        "versions": [
          "4MATIC EQ Hybrid",
          "4MATIC EQ Hybrid Largo"
        ]
      }
    ]
  },
  {
    "make": "Mitsubishi",
    "models": [
      {
        "name": "Eclipse Cross",
        "versions": [
          "EV 70 kWh"
        ]
      },
      {
        "name": "Outlander",
        "versions": [
          "PHEV First Edition 4WD",
          "PHEV Kaiteki 4WD",
          "PHEV Kaiteki+ 4WD",
          "PHEV Motion 4WD"
        ]
      }
    ]
  },
  {
    "make": "Nissan",
    "models": [
      {
        "name": "Ariya",
        "versions": [
          "63 kWh FWD",
          "87 kWh FWD"
        ]
      },
      {
        "name": "Leaf",
        "versions": [
          "40 kWh",
          "62 kWh"
        ]
      }
    ]
  },
  {
    "make": "Omoda",
    "models": [
      {
        "name": "7",
        "versions": [
          "SHS PHEV Premium 1.5 TGDI 279 CV",
          "SHS PHEV Pure 1.5 TGDI 279 CV"
        ]
      },
      {
        "name": "9",
        "versions": [
          "SHS AWD 1.5 TGDI Premium"
        ]
      },
      {
        "name": "E5",
        "versions": [
          "61 kWh"
        ]
      }
    ]
  },
  {
    "make": "Opel",
    "models": [
      {
        "name": "Astra",
        "versions": [
          "GS Plug-in-Hybrid 195 CV"
        ]
      },
      {
        "name": "Astra Electric",
        "versions": [
          "54 kWh"
        ]
      },
      {
        "name": "Astra Sports Tourer",
        "versions": [
          "GS Plug-in-Hybrid 195 CV"
        ]
      },
      {
        "name": "Corsa Electric",
        "versions": [
          "54 kWh"
        ]
      },
      {
        "name": "Grandland",
        "versions": [
          "Edition Plug-in Hybrid 195 CV",
          "GS Plug-in Hybrid 195 CV"
        ]
      },
      {
        "name": "Mokka Electric",
        "versions": [
          "54 kWh"
        ]
      }
    ]
  },
  {
    "make": "Peugeot",
    "models": [
      {
        "name": "3008",
        "versions": [
          "Allure Exclusive Plug-in Hybrid 195 e-DCS7",
          "Allure Plug-in Hybrid 195 e-DCS7",
          "GT Exclusive Plug-in Hybrid 195 e-DCS7",
          "GT Plug-in Hybrid 195 e-DCS7"
        ]
      },
      {
        "name": "308 5p",
        "versions": [
          "Allure Plug-In Hybrid 195 e-DCS7",
          "GT Exclusive Plug-In Hybrid 195 e-DCS7",
          "GT Plug-In Hybrid 195 e-DCS7",
          "Style Plug-In Hybrid 195 e-DCS7"
        ]
      },
      {
        "name": "308 SW",
        "versions": [
          "Allure Plug-In Hybrid 195 e-DCS7",
          "GT Exclusive Plug-In Hybrid 195 e-DCS7",
          "GT Plug-In Hybrid 195 e-DCS7",
          "Style Plug-In Hybrid 195 e-DCS7"
        ]
      },
      {
        "name": "408",
        "versions": [
          "Allure Plug-In Hybrid 240 e-DCS7",
          "GT Exclusive Plug-In Hybrid 240 e-DCS7",
          "GT Plug-In Hybrid 240 e-DCS7"
        ]
      },
      {
        "name": "5008",
        "versions": [
          "Allure Plug-In Hybrid 195 e-DCS7",
          "GT Exclusive Plug-In Hybrid 195 e-DCS7",
          "GT Plug-In Hybrid 195 e-DCS7"
        ]
      },
      {
        "name": "e-2008",
        "versions": [
          "Long Range 54 kWh",
          "Standard 54 kWh"
        ]
      },
      {
        "name": "e-208",
        "versions": [
          "Long Range 54 kWh",
          "Standard 51 kWh"
        ]
      }
    ]
  },
  {
    "make": "Polestar",
    "models": [
      {
        "name": "2",
        "versions": [
          "Long Range Dual Motor",
          "Long Range Single Motor",
          "Standard Range Single Motor"
        ]
      },
      {
        "name": "3",
        "versions": [
          "Long Range Dual Motor 107 kWh",
          "Long Range Single Motor"
        ]
      }
    ]
  },
  {
    "make": "Porsche",
    "models": [
      {
        "name": "Cayenne",
        "versions": [
          "E-Hybrid",
          "E-Hybrid Coup\u00e9"
        ]
      },
      {
        "name": "Cayenne S",
        "versions": [
          "E-Hybrid",
          "E-Hybrid Coup\u00e9"
        ]
      },
      {
        "name": "Cayenne Turbo",
        "versions": [
          "E-Hybrid",
          "E-Hybrid Coup\u00e9",
          "E-Hybrid Coup\u00e9 GT"
        ]
      },
      {
        "name": "Panamera",
        "versions": [
          "4 E-Hybrid",
          "4 E-Hybrid Executive",
          "4S E-Hybrid"
        ]
      },
      {
        "name": "Panamera Turbo",
        "versions": [
          "E-Hybrid"
        ]
      },
      {
        "name": "Panamera Turbo S",
        "versions": [
          "E-Hybrid",
          "E-Hybrid Executive"
        ]
      }
    ]
  },
  {
    "make": "Renault",
    "models": [
      {
        "name": "5 E-Tech",
        "versions": [
          "120 CV Standard Range",
          "150 CV Long Range"
        ]
      },
      {
        "name": "Megane E-Tech",
        "versions": [
          "EV40 130 CV",
          "EV60 220 CV"
        ]
      },
      {
        "name": "Rafale",
        "versions": [
          "atelier Alpine hyper hybrid E-Tech 4x4 300 CV",
          "esprit Alpine hyper hybrid E-Tech 4x4 300 CV"
        ]
      },
      {
        "name": "Scenic E-Tech",
        "versions": [
          "Autonom\u00eda Est\u00e1ndar 170 CV",
          "Gran Autonom\u00eda 220 CV"
        ]
      },
      {
        "name": "Zoe",
        "versions": [
          "R110 52 kWh"
        ]
      }
    ]
  },
  {
    "make": "SEAT",
    "models": [
      {
        "name": "Le\u00f3n",
        "versions": [
          "1.5 eHybrid 204 CV DSG FR XM",
          "1.5 eHybrid 204 CV DSG Style"
        ]
      },
      {
        "name": "Le\u00f3n Sportstourer",
        "versions": [
          "1.5 eHybrid 204 CV DSG FR XM",
          "1.5 eHybrid 204 CV DSG Style"
        ]
      },
      {
        "name": "el-Born",
        "versions": [
          "58 kWh"
        ]
      }
    ]
  },
  {
    "make": "Santana",
    "models": [
      {
        "name": "400",
        "versions": [
          "PHEV 4WD 429 CV",
          "PHEV S 4WD 429 CV"
        ]
      }
    ]
  },
  {
    "make": "Skoda",
    "models": [
      {
        "name": "Enyaq",
        "versions": [
          "60 62 kWh",
          "85 82 kWh",
          "85x 82 kWh AWD"
        ]
      },
      {
        "name": "Kodiaq",
        "versions": [
          "Plus 1.5 TSI iV PHEV 204 CV DSG",
          "Selection 1.5 TSI iV PHEV 204 CV DSG",
          "Sportline 1.5 TSI iV PHEV 204 CV DSG"
        ]
      },
      {
        "name": "Superb",
        "versions": [
          "L&K 1.5 TSI iV PHEV 204 CV DSG",
          "Plus 1.5 TSI iV PHEV 204 CV DSG",
          "Selection 1.5 TSI iV PHEV 204 CV DSG",
          "Sportline 1.5 TSI iV PHEV 204 CV DSG"
        ]
      },
      {
        "name": "Superb Combi",
        "versions": [
          "L&K 1.5 TSI iV PHEV 204 CV DSG",
          "Plus 1.5 TSI iV PHEV 204 CV DSG",
          "Selection 1.5 TSI iV PHEV 204 CV DSG",
          "Sportline 1.5 TSI iV PHEV 204 CV DSG"
        ]
      }
    ]
  },
  {
    "make": "Subaru",
    "models": [
      {
        "name": "Solterra",
        "versions": [
          "71,4 kWh AWD"
        ]
      }
    ]
  },
  {
    "make": "Suzuki",
    "models": [
      {
        "name": "Across",
        "versions": [
          "2.5 PHEV 4x4 GLX"
        ]
      }
    ]
  },
  {
    "make": "Tesla",
    "models": [
      {
        "name": "Model 3",
        "versions": [
          "Long Range AWD",
          "Performance AWD",
          "Standard Range AWD"
        ]
      },
      {
        "name": "Model S",
        "versions": [
          "Plaid",
          "Standard Range"
        ]
      },
      {
        "name": "Model X",
        "versions": [
          "Long Range AWD",
          "Plaid"
        ]
      },
      {
        "name": "Model Y",
        "versions": [
          "Long Range AWD",
          "Performance AWD",
          "Standard Range RWD"
        ]
      }
    ]
  },
  {
    "make": "Toyota",
    "models": [
      {
        "name": "C-HR",
        "versions": [
          "Plug-in Hybrid 220 Advance",
          "Plug-in Hybrid 220 Business",
          "Plug-in Hybrid 220 GR Sport",
          "Plug-in Hybrid 220 GR Sport Plus",
          "Plug-in Hybrid 220 Spirit"
        ]
      },
      {
        "name": "RAV4",
        "versions": [
          "Plug-in Hybrid 300 Advance",
          "Plug-in Hybrid 300 Advance AWD",
          "Plug-in Hybrid 300 GR Sport AWD",
          "Plug-in Hybrid 300 Limited AWD",
          "Plug-in Hybrid 300 Spirit",
          "Plug-in Hybrid 300 Spirit AWD"
        ]
      },
      {
        "name": "bZ4X",
        "versions": [
          "AWD 72,8 kWh",
          "FWD 71,4 kWh"
        ]
      }
    ]
  },
  {
    "make": "Volkswagen",
    "models": [
      {
        "name": "Caddy",
        "versions": [
          "Origin 1.5 TSI Hybrid 150 CV DSG",
          "Outdoor 1.5 TSI Hybrid 150 CV DSG"
        ]
      },
      {
        "name": "Caddy Maxi",
        "versions": [
          "Origin 1.5 TSI Hybrid 150 CV DSG 7 plazas"
        ]
      },
      {
        "name": "California",
        "versions": [
          "Beach Tour 1.5 eHybrid 245 CV DSG 4Motion",
          "Beach Tour eHybrid",
          "Ocean 1.5 eHybrid 245 CV DSG 4Motion",
          "Ocean eHybrid"
        ]
      },
      {
        "name": "Caravelle",
        "versions": [
          "Batalla Corta 2.5 eHybrid 232 CV CVT",
          "Batalla Corta Premium 2.5 eHybrid 232 CV",
          "Batalla Larga 2.5 eHybrid 232 CV CVT",
          "Batalla Larga Premium 2.5 eHybrid 232 CV"
        ]
      },
      {
        "name": "Golf",
        "versions": [
          "GTE 1.5 TSI 272 CV DSG",
          "Match 1.5 eHybrid 204 CV DSG",
          "Style 1.5 eHybrid 204 CV DSG"
        ]
      },
      {
        "name": "ID.3",
        "versions": [
          "Pro 58 kWh",
          "Pro S 77 kWh"
        ]
      },
      {
        "name": "ID.4",
        "versions": [
          "GTX 77 kWh",
          "Pro 77 kWh"
        ]
      },
      {
        "name": "ID.5",
        "versions": [
          "GTX 77 kWh",
          "Pro 77 kWh"
        ]
      },
      {
        "name": "ID.7",
        "versions": [
          "Pro 77 kWh",
          "Pro S 91 kWh"
        ]
      },
      {
        "name": "Multivan",
        "versions": [
          "corto 1.5 eHybrid 245 CV DSG 4Motion",
          "corto Life 1.5 eHybrid 245 CV DSG 4Motion",
          "corto Style 1.5 eHybrid 245 CV DSG 4Motion",
          "largo Style 1.5 eHybrid 245 CV DSG 4Motion"
        ]
      },
      {
        "name": "Passat Variant",
        "versions": [
          "1.5 TSI eHybrid 204 CV",
          "Business 1.5 TSI eHybrid 272 CV",
          "R-Line 1.5 TSI eHybrid 272 CV"
        ]
      },
      {
        "name": "Tayron",
        "versions": [
          "M\u00e1s 1.5 eHybrid 204 CV DSG",
          "R-Line 1.5 eHybrid 272 CV DSG"
        ]
      },
      {
        "name": "Tiguan",
        "versions": [
          "M\u00e1s 1.5 TSI eHybrid 204 CV",
          "R-Line 1.5 TSI eHybrid 204 CV",
          "R-Line 1.5 TSI eHybrid 272 CV"
        ]
      },
      {
        "name": "Touareg",
        "versions": [
          "Elegance Final Edition 3.0 V6 TSI eHybrid 381 CV",
          "R Final Edition 3.0 V6 TSI eHybrid 462 CV"
        ]
      }
    ]
  },
  {
    "make": "Volvo",
    "models": [
      {
        "name": "EC40",
        "versions": [
          "Single Motor Extended Range"
        ]
      },
      {
        "name": "EX30",
        "versions": [
          "Single Motor Extended Range 69 kWh",
          "Twin Motor Performance"
        ]
      },
      {
        "name": "EX40",
        "versions": [
          "Single Motor Extended Range",
          "Twin Motor"
        ]
      },
      {
        "name": "EX90",
        "versions": [
          "Twin Motor 111 kWh"
        ]
      },
      {
        "name": "V60",
        "versions": [
          "Core T6 AWD H\u00edbrido enchufable",
          "Plus T6 AWD H\u00edbrido enchufable",
          "Ultra T6 AWD H\u00edbrido enchufable"
        ]
      },
      {
        "name": "V90",
        "versions": [
          "Recharge T6 eAWD Core",
          "Recharge T6 eAWD Plus",
          "Recharge T6 eAWD Ultra"
        ]
      },
      {
        "name": "XC60",
        "versions": [
          "Core T6 AWD H\u00edbrido enchufable",
          "Plus T6 AWD H\u00edbrido enchufable",
          "Polestar Engineered T8 AWD H\u00edbrido enchufable",
          "Ultra T6 AWD H\u00edbrido enchufable"
        ]
      },
      {
        "name": "XC90",
        "versions": [
          "T8 AWD Core",
          "T8 AWD Plus",
          "T8 AWD Ultra"
        ]
      }
    ]
  },
  {
    "make": "smart",
    "models": [
      {
        "name": "#1",
        "versions": [
          "Pulse 66 kWh"
        ]
      },
      {
        "name": "#3",
        "versions": [
          "Brabus AWD 66 kWh"
        ]
      }
    ]
  }
]
