import downloadSource from '@/data/downloadSource.json';
import Tutorial from '@/components/tutorial';



export default function Page() {
    return (
        <div className='text-center'>
            <h1 className="text-6xl font-bold mb-4 px-6">Tutorial</h1>
            <h2 className="text-3xl mb-4 ">¿Cómo descargar el horario desde AcademuSoft?</h2>
            <Tutorial steps={downloadSource} />
        </div>
        
    )
}