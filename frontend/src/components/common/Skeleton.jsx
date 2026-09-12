import './Skeleton.css';
function Skeleton({
                      width = '100%',
                      height = '14px',
                      radius = '6px'
                  }) {
    return (
        <div
            className="skeleton"
            style={{
                width,
                height,
                borderRadius: radius
            }}
        />
    );
}

export default Skeleton;