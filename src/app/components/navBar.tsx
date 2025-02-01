import { useRouter } from "next/navigation";

export default function NavBar() {
    const router = useRouter();
    
    const buttonStyle = {
        padding: 5,
        margin: 5,
        border: '3px solid #1F2937',
        borderRadius: 7,
        cursor: 'pointer'
    };

    return (
        <div>
            <button style={buttonStyle} onClick={() => router.push('/finances')}>
                Resumen de finanzas
            </button>
            <button style={buttonStyle} onClick={() => router.push('/dashboard')}>
                Dashboard
            </button>
        </div>
    );
}
