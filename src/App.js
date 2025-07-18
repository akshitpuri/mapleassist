import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { lazy, Suspense } from 'react';

// About Page
import About from './components/About';

// Terms & Privacy

import Terms from './components/Terms';
import Privacy from './components/Privacy';


// Calculator pages

import LoanCalculator from './components/Calculators/Finance/LoanCalculator';
import InvestmentCalculator from './components/Calculators/Finance/InvestmentCalculator';
import BMICalculator from './components/Calculators/Health/BMICalculator';
import PercentageCalculator from './components/Calculators/Math/PercentageCalculator';
import AgeCalculator from './components/Calculators/Time/AgeCalculator';
import RandomNumberGenerator from './components/Calculators/Math/RandomNumberGenerator';

//MathHome
import MathHome from './components/Calculators/Math/MathHome';
import BasicCalculator from './components/Calculators/Math/BasicCalculator';
import FractionCalculator from './components/Calculators/Math/FractionCalculator';
import SquareFootageCalculator from './components/Calculators/Math/SquareFootageCalculator';

import QuadraticFormulaCalculator from './components/Calculators/Math/QuadraticFormulaCalculator';
import NumberGenerator from './components/Calculators/Math/NumberGenerator';
import RoundingCalculator from './components/Calculators/Math/RoundingCalculator';
import ScientificCalculator from './components/Calculators/Math/ScientificCalculator';
import MixedNumberCalculator from './components/Calculators/Math/MixedNumberCalculator';
import DecimalToFractionCalculator from './components/Calculators/Math/DecimalToFractionCalculator';
import SimplifyingFractionsCalculator from './components/Calculators/Math/SimplifyingFractionsCalculator';
import SlopeCalculator from './components/Calculators/Math/SlopeCalculator';
import LCMCalculator from './components/Calculators/Math/LCMCalculator';
import RatioCalculator from './components/Calculators/Math/RatioCalculator';
import PercentageIncreaseCalculator from './components/Calculators/Math/PercentageIncreaseCalculator';
import LongDivisionCalculator from './components/Calculators/Math/LongDivisionCalculator';
import TriangleCalculator from './components/Calculators/Math/TriangleCalculator';
import PercentageChangeCalculator from './components/Calculators/Math/PercentageChangeCalculator';
import VolumeCalculator from './components/Calculators/Math/VolumeCalculator';
import ScientificNotationConverter from './components/Calculators/Math/ScientificNotationConverter';
import SpeedCalculator from './components/Calculators/Math/SpeedCalculator';
import GCFCalculator from './components/Calculators/Math/GCFCalculator';
import FractionToDecimalCalculator from './components/Calculators/Math/FractionToDecimalCalculator';
import BinaryCalculator from './components/Calculators/Math/BinaryCalculator';
import AreaCalculator from './components/Calculators/Math/AreaCalculator';
import FactoringCalculator from './components/Calculators/Math/FactoringCalculator';
import SigFigCalculator from './components/Calculators/Math/SigFigCalculator';
import PercentageDifferenceCalculator from './components/Calculators/Math/PercentageDifferenceCalculator';
import RightTriangleCalculator from './components/Calculators/Math/RightTriangleCalculator';
import MixedFractionCalculator from './components/Calculators/Math/MixedFractionCalculator';
import FractionToPercentCalculator from './components/Calculators/Math/FractionToPercentCalculator';
import LCDCalculator from './components/Calculators/Math/LeastCommonDenominatorCalculator';
import ModuloCalculator from './components/Calculators/Math/ModuloCalculator';
import DensityCalculator from './components/Calculators/Math/DensityCalculator';
import EquivalentFractionsCalculator from './components/Calculators/Math/EquivalentFractionsCalculator';
import ScientificNotationCalculator from './components/Calculators/Math/ScientificNotationCalculator';
import AddingFractionsCalculator from './components/Calculators/Math/AddingFractionsCalculator';
import DecimalToPercentCalculator from './components/Calculators/Math/DecimalToPercentCalculator';
import HexCalculator from './components/Calculators/Math/HexCalculator';
import TankVolumeCalculator from './components/Calculators/Math/TankVolumeCalculator';
import StandardFormCalculator from './components/Calculators/Math/StandardFormCalculator';
import MathEquationSolver from './components/Calculators/Math/MathEquationSolver';
import KineticEnergyCalculator from './components/Calculators/Math/KineticEnergyCalculator';
import CubeRootCalculator from './components/Calculators/Math/CubeRootCalculator';
import SequenceCalculator from './components/Calculators/Math/SequenceCalculator';
import SquareRootCalculator from './components/Calculators/Math/SquareRootCalculator';
import DistanceFormulaCalculator from './components/Calculators/Math/DistanceFormulaCalculator';
import PrimeFactorizationCalculator from './components/Calculators/Math/PrimeFactorizationCalculator';
import IntegerCalculator from './components/Calculators/Math/IntegerCalculator';
import SignificantFiguresCalculator from './components/Calculators/Math/SignificantFiguresCalculator';
import VelocityCalculator from './components/Calculators/Math/VelocityCalculator';
import ForceCalculator from './components/Calculators/Math/ForceCalculator';
import DistanceCalculator from './components/Calculators/Math/DistanceCalculator';
import PercentToFractionCalculator from './components/Calculators/Math/PercentToFractionCalculator';
import PythagoreanTheoremCalculator from './components/Calculators/Math/PythagoreanTheoremCalculator';
import PercentageDecreaseCalculator from './components/Calculators/Math/PercentageDecreaseCalculator';
import ProportionCalculator from './components/Calculators/Math/ProportionCalculator';
import QuadraticEquationCalculator from './components/Calculators/Math/QuadraticEquationCalculator';
import CoinFlipCalculator from './components/Calculators/Math/CoinFlipCalculator';

//StatisticsHome
import StatisticsHome from './components/Calculators/Statistics/StatisticsHome';
import StandardDeviationCalculator from './components/Calculators/Statistics/StandardDeviation';
import MeanMedianModeCalculator from './components/Calculators/Statistics/MeanMedianMode';
import VarianceCalculator from './components/Calculators/Statistics/Variance';
import CombinationsCalculator from './components/Calculators/Statistics/Combinations';
import AverageCalculator from './components/Calculators/Statistics/AverageCalculator';
import MeanCalculator from './components/Calculators/Statistics/MeanCalculator';
import MeanMedianModeRangeCalculator from './components/Calculators/Statistics/MeanMedianModeRangeCalculator';
import QuartileCalculator from './components/Calculators/Statistics/QuartileCalculator';
import PercentileCalculator from './components/Calculators/Statistics/PercentileCalculator';
import ZScoreCalculator from './components/Calculators/Statistics/ZScoreCalculator';
import PermutationCalculator from './components/Calculators/Statistics/PermutationCalculator';
import ProbabilityCalculator from './components/Calculators/Statistics/ProbabilityCalculator';
import OddsCalculator from './components/Calculators/Statistics/OddsCalculator';
import SampleSizeCalculator from './components/Calculators/Statistics/SampleSizeCalculator';

// NotFound
import NotFound from './components/NotFound';

// Category Homes
import TimeHome from './components/Calculators/Time/TimeHome';
import FinanceHome from './components/Calculators/Finance/FinanceHome';
import HealthHome from './components/Calculators/Health/HealthHome';
import MiscHome from './components/Calculators/Misc/MiscHome';

// Time & Date

import TimeCalculator from './components/Calculators/Time/TimeCalculator';
import HoursCalculator from './components/Calculators/Time/HoursCalculator';
import DurationCalculator from './components/Calculators/Time/DurationCalculator';
import DateCalculator from './components/Calculators/Time/DateCalculator';
import HoursAndMinutesCalculator from './components/Calculators/Time/HoursAndMinutesCalculator';
import TimeToDecimalCalculator from './components/Calculators/Time/TimeToDecimalCalculator';
import DaysCalculator from './components/Calculators/Time/DaysCalculator';
import TimerTool from './components/Calculators/Time/TimerTool';
import StopwatchTool from './components/Calculators/Time/StopwatchTool';
import AlarmClock from './components/Calculators/Time/AlarmClock';
import Metronome from './components/Calculators/Time/Metronome';

// Finance
import AutoLoanCalculator from './components/Calculators/Finance/AutoLoanCalculator';
import SimpleInterestCalculator from './components/Calculators/Finance/SimpleInterestCalculator';
import CompoundInterestCalculator from './components/Calculators/Finance/CompoundInterestCalculator';
import FinancialCalculator from './components/Calculators/Finance/FinancialCalculator';
import PaymentCalculator from './components/Calculators/Finance/PaymentCalculator';
import SalesTaxCalculator from './components/Calculators/Finance/SalesTaxCalculator';
import InterestCalculator from './components/Calculators/Finance/InterestCalculator';
import TipCalculator from './components/Calculators/Finance/TipCalculator';
import InterestRateCalculator from './components/Calculators/Finance/InterestRateCalculator';
import MortgageCalculator from './components/Calculators/Finance/MortgageCalculator';
import PersonalLoanCalculator from './components/Calculators/Finance/PersonalLoanCalculator';
import FutureValueCalculator from './components/Calculators/Finance/FutureValueCalculator';
import MortgagePaymentCalculator from './components/Calculators/Finance/MortgagePaymentCalculator';
import APRCalculator from './components/Calculators/Finance/APRCalculator';
import ROICalculator from './components/Calculators/Finance/ROICalculator';
import BusinessLoanCalculator from './components/Calculators/Finance/BusinessLoanCalculator';
import MarginCalculator from './components/Calculators/Finance/MarginCalculator';
import FourZeroOneKCalculator from './components/Calculators/Finance/FourZeroOneKCalculator';
import CarLoanCalculator from './components/Calculators/Finance/CarLoanCalculator';
import RentalPropertyCalculator from './components/Calculators/Finance/RentalPropertyCalculator';
import RetirementCalculator from './components/Calculators/Finance/RetirementCalculator';
import PresentValueCalculator from './components/Calculators/Finance/PresentValueCalculator';
import RefinanceCalculator from './components/Calculators/Finance/RefinanceCalculator';
import FHALoanCalculator from './components/Calculators/Finance/FHALoanCalculator';
import AnnuityCalculator from './components/Calculators/Finance/AnnuityCalculator';
import SimpleInvestmentCalculator from './components/Calculators/Finance/SimpleInvestmentCalculator';
import CreditCardPayoffCalculator from './components/Calculators/Finance/CreditCardPayoffCalculator';
import CDCalculator from './components/Calculators/Finance/CDCalculator';
import HomeLoanCalculator from './components/Calculators/Finance/HomeLoanCalculator';
import EMICalculator from './components/Calculators/Finance/EMICalculator';
import SIPCalculator from './components/Calculators/Finance/SIPCalculator';
import SalaryCalculator from './components/Calculators/Finance/SalaryCalculator';
import AmortizationCalculator from './components/Calculators/Finance/AmortizationCalculator';


// Health

import CalorieCalculator from './components/Calculators/Health/CalorieCalculator';
import BMRCalculator from './components/Calculators/Health/BMRCalculator';
import BodyFatCalculator from './components/Calculators/Health/BodyFatCalculator';
import IdealWeightCalculator from './components/Calculators/Health/IdealWeightCalculator';
import BACCalculator from './components/Calculators/Health/BACCalculator';
import BraSizeCalculator from './components/Calculators/Health/BraSizeCalculator';
import BodyTypeCalculator from './components/Calculators/Health/BodyTypeCalculator';
import ConceptionDateCalculator from './components/Calculators/Health/ConceptionDateCalculator';
import DueDateCalculator from './components/Calculators/Health/DueDateCalculator';
import MacroCalculator from './components/Calculators/Health/MacroCalculator';
import OvulationCalculator from './components/Calculators/Health/OvulationCalculator';
import PaceCalculator from './components/Calculators/Health/PaceCalculator';
import PeriodCalculator from './components/Calculators/Health/PeriodCalculator';
import PregnancyCalculator from './components/Calculators/Health/PregnancyCalculator';
import PregnancyWeightGainCalculator from './components/Calculators/Health/PregnancyWeightGainCalculator';
import ProteinCalculator from './components/Calculators/Health/ProteinCalculator';
import TDEECalculator from './components/Calculators/Health/TDEECalculator';
import ArmyBodyFatCalculator from './components/Calculators/Health/ArmyBodyFatCalculator';
import CaloriesBurnedCalculator from './components/Calculators/Health/CaloriesBurnedCalculator';


// Misc
import DiceRoller from './components/Calculators/Misc/DiceRoller';
import GradeCalculator from './components/Calculators/Misc/GradeCalculator';
import SubnetCalculator from './components/Calculators/Misc/SubnetCalculator';
import GPACalculator from './components/Calculators/Misc/GPACalculator';
import NumberToWords from './components/Calculators/Misc/NumberToWords';
import HeightCalculator from './components/Calculators/Misc/HeightCalculator';
import UnitConverter from './components/Calculators/Misc/UnitConverter';
import ConcreteCalculator from './components/Calculators/Misc/ConcreteCalculator';
import RomanNumeralConverter from './components/Calculators/Misc/RomanNumeralConverter';
import GasCostCalculator from './components/Calculators/Misc/GasCostCalculator';
import HeightConverter from './components/Calculators/Misc/HeightConverter';
import WorkHoursCalculator from './components/Calculators/Misc/WorkHoursCalculator';
import CircleCalculator from './components/Calculators/Misc/CircleCalculator';
import MetersToFeetConverter from './components/Calculators/Misc/MetersToFeetConverter';
import CubicYardsCalculator from './components/Calculators/Misc/CubicYardsCalculator';
import RomanNumeralDateConverter from './components/Calculators/Misc/RomanNumeralDateConverter';
import FeetInchesCalculator from './components/Calculators/Misc/FeetInchesCalculator';
import CylinderVolumeCalculator from './components/Calculators/Misc/CylinderVolumeCalculator';
import RoofingCalculator from './components/Calculators/Misc/RoofingCalculator';
import SleepCalculator from './components/Calculators/Misc/SleepCalculator';
import SnowDayCalculator from './components/Calculators/Misc/SnowDayCalculator';
import GematriaCalculator from './components/Calculators/Misc/GematriaCalculator';
const LoveCalculatorTool = lazy(() =>
  import('./components/Calculators/Misc/LoveCalculatorTool')
);



//DashBoard 
import AllCalculatorsPage from './pages/AllCalculatorsPage';


// Document tools

import FileToolsHome from './components/filetools/FileToolsHome';
import PDFToolsHome from './components/filetools/pdftools/PDFToolsHome';
import ImageToolsHome from './components/filetools/imagetools/ImageToolsHome';
const DocumentConverters = lazy(() => import('./components/filetools/converters/DocumentConverters'));
const AudioConverters = lazy(() => import('./components/filetools/converters/AudioConverters'));
const VideoConverters = lazy(() => import('./components/filetools/converters/VideoConverters'));
const EbookConverters = lazy(() => import('./components/filetools/converters/eBookConverters'));
const ArchiveConverters = lazy(() => import('./components/filetools/converters/ArchiveConverters'));
const CodeDataConverters = lazy(() => import('./components/filetools/converters/CodeDataConverters'));
const OCRTools = lazy(() => import('./components/filetools/ocr/OCRTools'));
const AllCompressionTools = lazy(() => import('./components/filetools/compression/AllCompressionTools'));

const GIFTools = lazy(() => import('./components/filetools/gifs/GIFTools'));
const CreateGIF = lazy(() => import('./components/filetools/gifs/CreateGIF'));
const ResizeGIF = lazy(() => import('./components/filetools/gifs/ResizeGIF'));
const CompressGIF = lazy(() => import('./components/filetools/gifs/CompressGIF'));
const ExtractGIFFrames = lazy(() => import('./components/filetools/gifs/ExtractGIFFrames'));


//PDF
const MergePDF = lazy(() => import('./components/filetools/pdftools/MergePDF'));
const SplitPDF = lazy(() => import('./components/filetools/pdftools/SplitPDF'));
const CompressPDF = lazy(() => import('./components/filetools/pdftools/CompressPDF'));
const ExtractPages = lazy(() => import('./components/filetools/pdftools/ExtractPages'));
const RemovePages = lazy(() => import('./components/filetools/pdftools/RemovePages'));
const RotatePages = lazy(() => import('./components/filetools/pdftools/RotatePages'));
const AddPageNumbers = lazy(() => import('./components/filetools/pdftools/AddPageNumbers'));
const AddWatermark = lazy(() => import('./components/filetools/pdftools/AddWatermark'));
const CropPDF = lazy(() => import('./components/filetools/pdftools/CropPDF'));
const ReorderPages = lazy(() => import('./components/filetools/pdftools/ReorderPages'));
const InsertBlankPages = lazy(() => import('./components/filetools/pdftools/InsertBlankPages'));
const AnnotatePDF = lazy(() => import('./components/filetools/pdftools/AnnotatePDF'));
const DrawSignature = lazy(() => import('./components/filetools/pdftools/DrawSignature'));
const AddImageStamp = lazy(() => import('./components/filetools/pdftools/AddImageStamp'));
const CombineAssets = lazy(() => import('./components/filetools/pdftools/CombineAssets'));
const FlattenPDF = lazy(() => import('./components/filetools/pdftools/FlattenPDF'));
const CutPageRanges = lazy(() => import('./components/filetools/pdftools/CutPageRanges'));
const ExtractImagesAndText = lazy(() => import('./components/filetools/pdftools/ExtractImagesAndText'));




//Image
const CompressImage = lazy(() => import('./components/filetools/imagetools/CompressImage'));
const ResizeImage = lazy(() => import('./components/filetools/imagetools/ResizeImage'));
const CropImage = lazy(() => import('./components/filetools/imagetools/CropImage'));
const ConvertToJPG = lazy(() => import('./components/filetools/imagetools/ConvertToJPG'));
const ConvertFromJPG = lazy(() => import('./components/filetools/imagetools/ConvertFromJPG'));
const PhotoEditor = lazy(() => import('./components/filetools/imagetools/PhotoEditor'));
const UpscaleImage = lazy(() => import('./components/filetools/imagetools/UpscaleImage'));
const RemoveBackground = lazy(() => import('./components/filetools/imagetools/RemoveBackground'));
const WatermarkImage = lazy(() => import('./components/filetools/imagetools/WatermarkImage'));
const MemeGenerator = lazy(() => import('./components/filetools/imagetools/MemeGenerator'));
const RotateImage = lazy(() => import('./components/filetools/imagetools/RotateImage'));
const HTMLtoImage = lazy(() => import('./components/filetools/imagetools/HTMLtoImage'));
const BlurFace = lazy(() => import('./components/filetools/imagetools/BlurFace'));

// New Tools added
const TextToolsHome = lazy(() => import('./components/filetools/texttools/TextToolsHome'));
const WebSeoToolsHome = lazy(() => import('./components/filetools/webseotools/WebSeoToolsHome'));
const PrivacySecurityToolsHome = lazy(() => import('./components/filetools/privacysecuritytools/PrivacySecurityToolsHome'));
const CaseConverterTool = lazy(() => import('./components/filetools/texttools/CaseConverterTool'));
const WordCounterTool = lazy(() => import('./components/filetools/texttools/WordCounterTool'));
const LoremIpsumGenerator = lazy(() => import('./components/filetools/texttools/LoremIpsumGenerator'));
const MetaTagGenerator = lazy(() => import('./components/filetools/webseotools/MetaTagGenerator'));
const KeywordDensityChecker = lazy(() => import('./components/filetools/webseotools/KeywordDensityChecker'));
const ResponsivePreviewer = lazy(() => import('./components/filetools/webseotools/ResponsivePreviewer'));
const PasswordGenerator = lazy(() => import('./components/filetools/privacysecuritytools/PasswordGenerator'));
const StrengthCheckerTool = lazy(() => import('./components/filetools/privacysecuritytools/StrengthCheckerTool'));
const URLEncoderTool = lazy(() => import('./components/filetools/privacysecuritytools/URLEncoderTool'));
const HashGeneratorTool = lazy(() => import('./components/filetools/privacysecuritytools/HashGeneratorTool'));
const QRCodeGenerator = lazy(() => import('./components/filetools/privacysecuritytools/QRCodeGenerator'));




//Dashboard
import CalculatorDashboard from './pages/CalculatorDashboard';

function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>

      <Header />
      <main style={{ flex: 1 }}>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/calculators" element={<CalculatorDashboard />} />

        {/* About */}
         <Route path="/about" element={<About />} />

        {/* Terms & Privacy */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />



        {/* Calculators */}
        
        <Route path="/calculators/all" element={<AllCalculatorsPage />} />

        <Route path="/calculators/finance/loan" element={<LoanCalculator />} />
        <Route path="/calculators/finance/investment" element={<InvestmentCalculator />} />
        <Route path="/calculators/health/bmi" element={<BMICalculator />} />
        <Route path="/calculators/time/age" element={<AgeCalculator />} />
        
        {/* Statistics */}
        <Route path="/calculators/statistics" element={<StatisticsHome />} />
        <Route path="/calculators/statistics/std-dev" element={<StandardDeviationCalculator />} />
        <Route path="/calculators/statistics/mmm" element={<MeanMedianModeCalculator />} />
        <Route path="/calculators/statistics/variance" element={<VarianceCalculator />} />
        <Route path="/calculators/statistics/combinations" element={<CombinationsCalculator />} />
        <Route path="/calculators/statistics/average" element={<AverageCalculator />} />
        <Route path="/calculators/statistics/mean" element={<MeanCalculator />} />
        <Route path="/calculators/statistics/mmmr" element={<MeanMedianModeRangeCalculator />} />
        <Route path="/calculators/statistics/quartile" element={<QuartileCalculator />} />
        <Route path="/calculators/statistics/percentile" element={<PercentileCalculator />} />
        <Route path="/calculators/statistics/z-score" element={<ZScoreCalculator />} />
        <Route path="/calculators/statistics/permutation" element={<PermutationCalculator />} />
        <Route path="/calculators/statistics/probability" element={<ProbabilityCalculator />} />
        <Route path="/calculators/statistics/odds" element={<OddsCalculator />} />
        <Route path="/calculators/statistics/sample-size" element={<SampleSizeCalculator />} />

        <Route path="/calculators/math" element={<MathHome />} />
        <Route path="/calculators/math/basic" element={<BasicCalculator />} />
        <Route path="/calculators/math/fraction" element={<FractionCalculator />} />
        <Route path="/calculators/math/percentage" element={<PercentageCalculator />} />
        <Route path="/calculators/math/random" element={<RandomNumberGenerator />} />
        <Route path="/calculators/math/sq-ft" element={<SquareFootageCalculator />} />
        <Route path="/calculators/math/quadratic-formula" element={<QuadraticFormulaCalculator />} />
        <Route path="/calculators/math/number-generator" element={<NumberGenerator />} />
        <Route path="/calculators/math/rounding" element={<RoundingCalculator />} />
        <Route path="/calculators/math/scientific" element={<ScientificCalculator />} />
        <Route path="/calculators/math/mixed-number" element={<MixedNumberCalculator />} />
        <Route path="/calculators/math/decimal-to-fraction" element={<DecimalToFractionCalculator />} />
        <Route path="/calculators/math/simplifying-fractions" element={<SimplifyingFractionsCalculator />} />
        <Route path="/calculators/math/slope" element={<SlopeCalculator />} />
        <Route path="/calculators/math/lcm" element={<LCMCalculator />} />
        <Route path="/calculators/math/ratio" element={<RatioCalculator />} />
        <Route path="/calculators/math/percentage-increase" element={<PercentageIncreaseCalculator />} />
        <Route path="/calculators/math/long-division" element={<LongDivisionCalculator />} />
        <Route path="/calculators/math/triangle" element={<TriangleCalculator />} />
        <Route path="/calculators/math/percentage-change" element={<PercentageChangeCalculator />} />
        <Route path="/calculators/math/volume" element={<VolumeCalculator />} />
        <Route path="/calculators/math/scientific-notation-converter" element={<ScientificNotationConverter />} />
        <Route path="/calculators/math/speed" element={<SpeedCalculator />} />
        <Route path="/calculators/math/gcf" element={<GCFCalculator />} />
        <Route path="/calculators/math/fraction-to-decimal" element={<FractionToDecimalCalculator />} />
        <Route path="/calculators/math/binary" element={<BinaryCalculator />} />
        <Route path="/calculators/math/area" element={<AreaCalculator />} />
        <Route path="/calculators/math/factoring" element={<FactoringCalculator />} />
        <Route path="/calculators/math/sig-fig" element={<SigFigCalculator />} />
        <Route path="/calculators/math/percentage-difference" element={<PercentageDifferenceCalculator />} />
        <Route path="/calculators/math/right-triangle" element={<RightTriangleCalculator />} />
        <Route path="/calculators/math/mixed-fraction" element={<MixedFractionCalculator />} />
        <Route path="/calculators/math/fraction-to-percent" element={<FractionToPercentCalculator />} />
        <Route path="/calculators/math/lcd" element={<LCDCalculator />} />
        <Route path="/calculators/math/modulo" element={<ModuloCalculator />} />
        <Route path="/calculators/math/density" element={<DensityCalculator />} />
        <Route path="/calculators/math/equivalent-fractions" element={<EquivalentFractionsCalculator />} />
        <Route path="/calculators/math/scientific-notation" element={<ScientificNotationCalculator />} />
        <Route path="/calculators/math/adding-fractions" element={<AddingFractionsCalculator />} />
        <Route path="/calculators/math/decimal-to-percent" element={<DecimalToPercentCalculator />} />
        <Route path="/calculators/math/hex" element={<HexCalculator />} />
        <Route path="/calculators/math/tank-volume" element={<TankVolumeCalculator />} />
        <Route path="/calculators/math/standard-form" element={<StandardFormCalculator />} />
        <Route path="/calculators/math/equation-solver" element={<MathEquationSolver />} />
        <Route path="/calculators/math/kinetic-energy" element={<KineticEnergyCalculator />} />
        <Route path="/calculators/math/cube-root" element={<CubeRootCalculator />} />
        <Route path="/calculators/math/sequences" element={<SequenceCalculator />} />
        <Route path="/calculators/math/square-root" element={<SquareRootCalculator />} />
        <Route path="/calculators/math/distance-formula" element={<DistanceFormulaCalculator />} />
        <Route path="/calculators/math/prime-factorization" element={<PrimeFactorizationCalculator />} />
        <Route path="/calculators/math/integers" element={<IntegerCalculator />} />
        <Route path="/calculators/math/significant-figures" element={<SignificantFiguresCalculator />} />
        <Route path="/calculators/math/velocity" element={<VelocityCalculator />} />
        <Route path="/calculators/math/force" element={<ForceCalculator />} />
        <Route path="/calculators/math/distance" element={<DistanceCalculator />} />
        <Route path="/calculators/math/percent-to-fraction" element={<PercentToFractionCalculator />} />
        <Route path="/calculators/math/pythagorean-theorem" element={<PythagoreanTheoremCalculator />} />
        <Route path="/calculators/math/percentage-decrease" element={<PercentageDecreaseCalculator />} />
        <Route path="/calculators/math/proportion" element={<ProportionCalculator />} />
        <Route path="/calculators/math/quadratic-equation" element={<QuadraticEquationCalculator />} />
        <Route path="/calculators/math/coin-flip" element={<CoinFlipCalculator />} />

        {/* PDF Tools */}
        <Route
          path="/filetools/pdftools/merge"
          element={
            <Suspense fallback={<div>Loading Merge Tool...</div>}>
              <MergePDF />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/split"
          element={
            <Suspense fallback={<div>Loading Split Tool...</div>}>
              <SplitPDF />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/compress"
          element={
            <Suspense fallback={<div>Loading Compress Tool...</div>}>
              <CompressPDF />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/extract"
          element={
            <Suspense fallback={<div>Loading Extract Pages...</div>}>
              <ExtractPages />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/remove"
          element={
            <Suspense fallback={<div>Loading Remove Pages...</div>}>
              <RemovePages />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/rotate"
          element={
            <Suspense fallback={<div>Loading Rotate Pages...</div>}>
              <RotatePages />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/page-numbers"
          element={
            <Suspense fallback={<div>Loading Add Page Numbers...</div>}>
              <AddPageNumbers />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/watermark"
          element={
            <Suspense fallback={<div>Loading Add Watermark...</div>}>
              <AddWatermark />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/crop"
          element={
            <Suspense fallback={<div>Loading Crop PDF...</div>}>
              <CropPDF />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/reorder"
          element={
            <Suspense fallback={<div>Loading Reorder Pages...</div>}>
              <ReorderPages />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/insert-blank"
          element={
            <Suspense fallback={<div>Loading Insert Blank Pages...</div>}>
              <InsertBlankPages />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/annotate"
          element={
            <Suspense fallback={<div>Loading Annotate PDF...</div>}>
              <AnnotatePDF />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/signature"
          element={
            <Suspense fallback={<div>Loading Draw Signature...</div>}>
              <DrawSignature />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/stamp"
          element={
            <Suspense fallback={<div>Loading Add Image Stamp...</div>}>
              <AddImageStamp />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/combineassets"
          element={
            <Suspense fallback={<div>Loading Combine Assets...</div>}>
              <CombineAssets />
            </Suspense>
          }
        />
        
        <Route
          path="/filetools/pdftools/flatten"
          element={
            <Suspense fallback={<div>Loading Flatten PDF Tool...</div>}>
              <FlattenPDF />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/range-cut"
          element={
            <Suspense fallback={<div>Loading Cut Page Ranges...</div>}>
              <CutPageRanges />
            </Suspense>
          }
        />
        <Route
          path="/filetools/pdftools/imgandtextextract"
          element={
            <Suspense fallback={<div>Loading Extract Tool...</div>}>
              <ExtractImagesAndText />
            </Suspense>
          }
        />


        {/* Time & Date */}
        <Route path="/calculators/time" element={<TimeHome />} />
        <Route path="/calculators/time/age" element={<AgeCalculator />} />
        <Route path="/calculators/time/time" element={<TimeCalculator />} />
        <Route path="/calculators/time/hours" element={<HoursCalculator />} />
        <Route path="/calculators/time/duration" element={<DurationCalculator />} />
        <Route path="/calculators/time/date" element={<DateCalculator />} />
        <Route path="/calculators/finance/simple-interest" element={<SimpleInterestCalculator />} />
        <Route path="/calculators/time/time-to-decimal" element={<TimeToDecimalCalculator />} />
        <Route path="/calculators/time/days-between" element={<DaysCalculator />} />
        <Route path="/calculators/time/timer" element={<TimerTool />} />
        <Route path="/calculators/time/stopwatch" element={<StopwatchTool />} />
        <Route path="/calculators/time/alarm-clock" element={<AlarmClock />} />
        <Route path="/calculators/time/metronome" element={<Metronome />} />
        <Route path="/calculators/time/hours-minutes" element={<HoursAndMinutesCalculator />} />
                
        
        
        {/* Finance */}
        <Route path="/calculators/finance" element={<FinanceHome />} />
        <Route path="/calculators/finance/auto-loan" element={<AutoLoanCalculator />} />
        <Route path="/calculators/finance/loan" element={<LoanCalculator />} />
        <Route path="/calculators/finance/salary" element={<SalaryCalculator />} />
        <Route path="/calculators/finance/amortization" element={<AmortizationCalculator />} />
        <Route path="/calculators/finance/simple-interest" element={<SimpleInterestCalculator />} />
        <Route path="/calculators/finance/compound-interest" element={<CompoundInterestCalculator />} />
        <Route path="/calculators/finance/financial" element={<FinancialCalculator />} />
        <Route path="/calculators/finance/payment" element={<PaymentCalculator />} />
        <Route path="/calculators/finance/sales-tax" element={<SalesTaxCalculator />} />
        <Route path="/calculators/finance/interest" element={<InterestCalculator />} />
        <Route path="/calculators/finance/tip" element={<TipCalculator />} />
        <Route path="/calculators/finance/interest-rate" element={<InterestRateCalculator />} />
        <Route path="/calculators/finance/mortgage" element={<MortgageCalculator />} />
        <Route path="/calculators/finance/personal-loan" element={<PersonalLoanCalculator />} />
        <Route path="/calculators/finance/future-value" element={<FutureValueCalculator />} />
        <Route path="/calculators/finance/mortgage-payment" element={<MortgagePaymentCalculator />} />
        <Route path="/calculators/finance/apr" element={<APRCalculator />} />
        <Route path="/calculators/finance/roi" element={<ROICalculator />} />
        <Route path="/calculators/finance/business-loan" element={<BusinessLoanCalculator />} />
        <Route path="/calculators/finance/margin" element={<MarginCalculator />} />
        <Route path="/calculators/finance/401k" element={<FourZeroOneKCalculator />} />
        <Route path="/calculators/finance/car-loan" element={<CarLoanCalculator />} />
        <Route path="/calculators/finance/rental-property" element={<RentalPropertyCalculator />} />
        <Route path="/calculators/finance/retirement" element={<RetirementCalculator />} />
        <Route path="/calculators/finance/present-value" element={<PresentValueCalculator />} />
        <Route path="/calculators/finance/refinance" element={<RefinanceCalculator />} />
        <Route path="/calculators/finance/fha-loan" element={<FHALoanCalculator />} />
        <Route path="/calculators/finance/annuity" element={<AnnuityCalculator />} />
        <Route path="/calculators/finance/simple-investment" element={<SimpleInvestmentCalculator />} />
        <Route path="/calculators/finance/credit-card-payoff" element={<CreditCardPayoffCalculator />} />
        <Route path="/calculators/finance/cd" element={<CDCalculator />} />
        <Route path="/calculators/finance/home-loan" element={<HomeLoanCalculator />} />
        <Route path="/calculators/finance/emi" element={<EMICalculator />} />
        <Route path="/calculators/finance/sip" element={<SIPCalculator />} />
        
        {/* Health */}
        <Route path="/calculators/health" element={<HealthHome />} />
        <Route path="/calculators/health/bmi" element={<BMICalculator />} />
        <Route path="/calculators/health/calorie" element={<CalorieCalculator />} />
        <Route path="/calculators/health/bmr" element={<BMRCalculator />} />
        <Route path="/calculators/health/body-fat" element={<BodyFatCalculator />} />
        <Route path="/calculators/health/ideal-weight" element={<IdealWeightCalculator />} />
        <Route path="/calculators/health/bac" element={<BACCalculator />} />
        <Route path="/calculators/health/bra-size" element={<BraSizeCalculator />} />
        <Route path="/calculators/health/body-type" element={<BodyTypeCalculator />} />
        <Route path="/calculators/health/conception-date" element={<ConceptionDateCalculator />} />
        <Route path="/calculators/health/due-date" element={<DueDateCalculator />} />
        <Route path="/calculators/health/macro" element={<MacroCalculator />} />
        <Route path="/calculators/health/ovulation" element={<OvulationCalculator />} />
        <Route path="/calculators/health/pace" element={<PaceCalculator />} />
        <Route path="/calculators/health/period" element={<PeriodCalculator />} />
        <Route path="/calculators/health/pregnancy" element={<PregnancyCalculator />} />
        <Route path="/calculators/health/pregnancy-weight-gain" element={<PregnancyWeightGainCalculator />} />
        <Route path="/calculators/health/protein" element={<ProteinCalculator />} />
        <Route path="/calculators/health/tdee" element={<TDEECalculator />} />
        <Route path="/calculators/health/army-body-fat" element={<ArmyBodyFatCalculator />} />
        <Route path="/calculators/health/calories-burned" element={<CaloriesBurnedCalculator />} />


        {/* Misc */}
        <Route path="/calculators/misc" element={<MiscHome />} />
        <Route path="/calculators/misc/dice" element={<DiceRoller />} />
        <Route path="/calculators/misc/grade" element={<GradeCalculator />} />
        <Route path="/calculators/misc/subnet" element={<SubnetCalculator />} />
        <Route path="/calculators/misc/gpa" element={<GPACalculator />} />
        <Route path="/calculators/misc/numbertowords" element={<NumberToWords />} />
        <Route path="/calculators/misc/height" element={<HeightCalculator />} />
        <Route path="/calculators/misc/unit" element={<UnitConverter />} />
        <Route path="/calculators/misc/concrete" element={<ConcreteCalculator />} />
        <Route path="/calculators/misc/roman-numeral" element={<RomanNumeralConverter />} />
        <Route path="/calculators/misc/gas-cost" element={<GasCostCalculator />} />
        <Route path="/calculators/misc/height-converter" element={<HeightConverter />} />
        <Route path="/calculators/misc/work-hours" element={<WorkHoursCalculator />} />
        <Route path="/calculators/misc/circle" element={<CircleCalculator />} />
        <Route path="/calculators/misc/meters-to-feet" element={<MetersToFeetConverter />} />
        <Route path="/calculators/misc/cubic-yards" element={<CubicYardsCalculator />} />
        <Route path="/calculators/misc/roman-date" element={<RomanNumeralDateConverter />} />
        <Route path="/calculators/misc/feet-inches" element={<FeetInchesCalculator />} />
        <Route path="/calculators/misc/cylinder-volume" element={<CylinderVolumeCalculator />} />
        <Route path="/calculators/misc/roofing" element={<RoofingCalculator />} />
        <Route path="/calculators/misc/sleep" element={<SleepCalculator />} />
        <Route path="/calculators/misc/snowday" element={<SnowDayCalculator />} />
        <Route path="/calculators/misc/gematria" element={<GematriaCalculator />} />
        {/* ❤️ Love Calculator */}
        <Route
          path="/calculators/misc/love-calculator"
          element={
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading Love Calculator...</div>}>
              <LoveCalculatorTool />
            </Suspense>
          }
        />

        <Route path="/filetools" element={<FileToolsHome />} />
        <Route path="/filetools/pdftools" element={<PDFToolsHome />} />
        
        {/* //ImageTools */}
        
        <Route path="/filetools/imagetools" element={<ImageToolsHome />} />
        <Route
            path="/filetools/imagetools/compress"
            element={
              <Suspense fallback={<div>Loading Compress Tool...</div>}>
                <CompressImage />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/resize"
            element={
              <Suspense fallback={<div>Loading Resize Tool...</div>}>
                <ResizeImage />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/crop"
            element={
              <Suspense fallback={<div>Loading Crop Tool...</div>}>
                <CropImage />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/convert-to-jpg"
            element={
              <Suspense fallback={<div>Loading Convert-to-JPG Tool...</div>}>
                <ConvertToJPG />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/convert-from-jpg"
            element={
              <Suspense fallback={<div>Loading Convert-from-JPG Tool...</div>}>
                <ConvertFromJPG />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/editor"
            element={
              <Suspense fallback={<div>Loading Photo Editor...</div>}>
                <PhotoEditor />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/upscale"
            element={
              <Suspense fallback={<div>Loading Upscale Tool...</div>}>
                <UpscaleImage />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/remove-background"
            element={
              <Suspense fallback={<div>Loading Remove Background Tool...</div>}>
                <RemoveBackground />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/watermark"
            element={
              <Suspense fallback={<div>Loading Watermark Tool...</div>}>
                <WatermarkImage />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/meme"
            element={
              <Suspense fallback={<div>Loading Meme Generator...</div>}>
                <MemeGenerator />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/rotate"
            element={
              <Suspense fallback={<div>Loading Rotate Tool...</div>}>
                <RotateImage />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/html-to-image"
            element={
              <Suspense fallback={<div>Loading HTML to Image Tool...</div>}>
                <HTMLtoImage />
              </Suspense>
            }
          />
          <Route
            path="/filetools/imagetools/blur-face"
            element={
              <Suspense fallback={<div>Loading Blur Face Tool...</div>}>
                <BlurFace />
              </Suspense>
            }
          />


        {/* Other Tools */}

        <Route
            path="/filetools/converters/document"
            element={
              <Suspense fallback={<div>Loading Document Converter...</div>}>
                <DocumentConverters />
              </Suspense>
            }
        />
        <Route
          path="/filetools/converters/audio"
          element={
            <Suspense fallback={<div>Loading Audio Converter...</div>}>
              <AudioConverters />
            </Suspense>
          }
        />

        <Route
          path="/filetools/converters/video"
          element={
            <Suspense fallback={<div>Loading Video Converter...</div>}>
              <VideoConverters />
            </Suspense>
          }
        />

       <Route
          path="/filetools/converters/ebook"
          element={
            <Suspense fallback={<div>Loading eBook Converter...</div>}>
              <EbookConverters />
            </Suspense>
          }
        />
        <Route
          path="/filetools/converters/archive"
          element={
            <Suspense fallback={<div>Loading Archive Converter...</div>}>
              <ArchiveConverters />
            </Suspense>
          }
        />
        <Route
          path="/filetools/converters/code-data"
          element={
            <Suspense fallback={<div>Loading Code/Data Converter...</div>}>
              <CodeDataConverters />
            </Suspense>
          }
        />
        <Route
          path="/filetools/ocr"
          element={
            <Suspense fallback={<div>Loading OCR Tool...</div>}>
              <OCRTools />
            </Suspense>
          }
        />
        <Route
          path="/filetools/compression"
          element={
            <Suspense fallback={<div>Loading Compression Tools...</div>}>
              <AllCompressionTools />
            </Suspense>
          }
        />

        <Route
          path="/filetools/gifs"
          element={
            <Suspense fallback={<div>Loading GIF Tools...</div>}>
              <GIFTools />
            </Suspense>
          }
        />
        {/* Create GIF */}
        <Route
          path="/filetools/gifs/create"
          element={
            <Suspense fallback={<div>Loading CreateGIF...</div>}>
              <CreateGIF />
            </Suspense>
          }
        />
        {/* Resize GIF */}
        <Route
          path="/filetools/gifs/resize"
          element={
            <Suspense fallback={<div>Loading ResizeGIF...</div>}>
              <ResizeGIF />
            </Suspense>
          }
        />
          {/* Compress GIF */}
        <Route
          path="/filetools/gifs/compress"
          element={
            <Suspense fallback={<div>Loading CompressGIF...</div>}>
              <CompressGIF />
            </Suspense>
          }
        />
          {/* Extract Frames */}
        <Route
          path="/filetools/gifs/extract"
          element={
            <Suspense fallback={<div>Loading ExtractGIFFrames...</div>}>
              <ExtractGIFFrames />
            </Suspense>
          }
        />
       {/* 🧠 Text & Writing Tools Home */}
      <Route
        path="/text-tools"
        element={
          <Suspense fallback={<div>Loading Text Tools...</div>}>
            <TextToolsHome />
          </Suspense>
        }
      />
      {/* 🔠 Case Converter */}
      <Route
        path="/text-tools/case-converter"
        element={
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading Case Converter...</div>}>
            <CaseConverterTool />
          </Suspense>
        }
      />

      {/* 🔢 Word & Character Counter */}
      <Route
        path="/text-tools/counter"
        element={
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading Word Counter...</div>}>
            <WordCounterTool />
          </Suspense>
        }
      />

      {/* 📄 Lorem Ipsum Generator */}
      <Route
        path="/text-tools/lorem-ipsum"
        element={
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading Lorem Ipsum Generator...</div>}>
            <LoremIpsumGenerator />
          </Suspense>
        }
      />


      {/* 🌐 Web & SEO Tools Home */}
      <Route
        path="/web-seo-tools"
        element={
          <Suspense fallback={<div>Loading Web & SEO Tools...</div>}>
            <WebSeoToolsHome />
          </Suspense>
        }
      />

      {/* 🔐 Privacy & Security Tools Home */}
      <Route
        path="/privacy-security-tools"
        element={
          <Suspense fallback={<div>Loading Privacy & Security Tools...</div>}>
            <PrivacySecurityToolsHome />
          </Suspense>
        }
      />
      {/* 📝 Meta Tag Generator */}
        <Route
          path="/web-seo-tools/meta-generator"
          element={
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading Meta Tag Generator...</div>}>
              <MetaTagGenerator />
            </Suspense>
          }
        />

        {/* 📊 Keyword Density Checker */}
        <Route
          path="/web-seo-tools/keyword-checker"
          element={
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading Keyword Checker...</div>}>
              <KeywordDensityChecker />
            </Suspense>
          }
        />

        {/* 📱 Responsive Previewer */}
        <Route
          path="/web-seo-tools/responsive-preview"
          element={
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading Responsive Previewer...</div>}>
              <ResponsivePreviewer />
            </Suspense>
          }
        />
        {/* 🔑 Password Generator */}
          <Route
            path="/privacy-security-tools/password-generator"
            element={
              <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading Password Generator...</div>}>
                <PasswordGenerator />
              </Suspense>
            }
          />

          {/* 💪 Password Strength Checker */}
          <Route
            path="/privacy-security-tools/strength-checker"
            element={
              <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading Strength Checker...</div>}>
                <StrengthCheckerTool />
              </Suspense>
            }
          />

          {/* 🔗 URL Encoder / Decoder */}
          <Route
            path="/privacy-security-tools/url-encoder"
            element={
              <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading URL Encoder...</div>}>
                <URLEncoderTool />
              </Suspense>
            }
          />

          {/* 🧬 Hash Generator */}
          <Route
            path="/privacy-security-tools/hash-generator"
            element={
              <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading Hash Generator...</div>}>
                <HashGeneratorTool />
              </Suspense>
            }
          />

          {/* 📷 QR Code Generator */}
          <Route
            path="/privacy-security-tools/qr-generator"
            element={
              <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading QR Code Generator...</div>}>
                <QRCodeGenerator />
              </Suspense>
            }
          />




      </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
