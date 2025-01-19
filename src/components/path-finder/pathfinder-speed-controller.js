export const PathfinderSpeedController = ({ min = 0.5, max = 4, step = 0.5, value, handleChange, isDisabled = false }) => {
    return (
        <div className="flex gap-2 items-center justify-center">
            <span className="text-center text-gray-300">Slow</span>
            <input
                disabled={isDisabled}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => handleChange(e)}
                className="w-full h-2 rounded-lg appearance-none cursor-none bg-gray-700"
            />
            <span className="text-center text-gray-300">Fast</span>
        </div>
    );
};